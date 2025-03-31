// app/api/storeBlog/route.ts
import { createClient } from "../../../utils/supabase/client"; // Adjusted the import path
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = createClient();

  // Get the Authorization header from the request
  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.split(" ")[1]; // Extract the Bearer token

  if (!token) {
    return NextResponse.json({ error: "You must be logged in to save your blog" }, { status: 401 });
  }

  // Validate session with Supabase
  const { data: user, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });
  }

  try {
    const { title, content } = await req.json(); // Parse the body of the request

    const { data, error } = await supabase.from("blogs").insert([
      {
        title,
        content,
        user_id: user.user.id,
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Something went wrong",
    }, { status: 500 });
  }
}
