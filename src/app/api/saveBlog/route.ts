import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Add CORS headers to all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Add config to ensure proper handling in production
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  runtime: 'edge',
};

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
        { status: 400, headers: corsHeaders }
      );
    }

    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400, headers: corsHeaders }
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
        { status: 401, headers: corsHeaders }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: corsHeaders }
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
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500, headers: corsHeaders }
    );
  }
}
