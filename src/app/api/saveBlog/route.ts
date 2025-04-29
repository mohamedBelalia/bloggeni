import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    // Log the request URL and headers for debugging
    console.log('Request URL:', req.url);
    console.log('Request Headers:', Object.fromEntries(req.headers.entries()));

    const supabase = createClient();
    
    // Validate request body
    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error('Error parsing request body:', e);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: "Authentication error" },
        { status: 401 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Insert blog into Supabase
    const { data, error } = await supabase.from("savedblogs").insert([
      {
        user_id: user.id,
        title,
        content,
      },
    ]);

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    return NextResponse.json(
      { message: "Blog saved successfully", data },
      { status: 200, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      } }
    );
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
