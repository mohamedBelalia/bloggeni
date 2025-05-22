
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function POST(request: Request) {
  const { title, keywords, language, size, tone, details } = await request.json();

  if (!title || !keywords || !language || !details) {
    return new Response(JSON.stringify({ message: 'Missing fields' }), { status: 400 });
  }

  const { data, error } = await supabase.from('blog_jobs').insert([{
    title, keywords, language, size, tone, details, status: 'pending'
  }]).select();

  if (error) {
    return new Response(JSON.stringify({ message: 'Error saving job' }), { status: 500 });
  }

  const jobId = data[0].id;

  return new Response(JSON.stringify({ jobId }), { status: 200 });
}
