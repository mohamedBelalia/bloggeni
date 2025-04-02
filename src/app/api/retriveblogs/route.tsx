import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = createClient(); // Get Supabase instance

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch blogs where user_id matches authenticated user
    const { data, error } = await supabase
      .from("savedblogs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ blogs: data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
