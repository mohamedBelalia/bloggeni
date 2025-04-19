import React from 'react'
import { createClient } from '@/utils/supabase/server';
import BlogGeneratePage from './generateBlogInterface'

const GenerateBlog = async () => {

  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();  

  console.log(error);
  

  return (
    <div>
      {
        data && data.user
        ?
        <BlogGeneratePage userId={data.user.id} />
        : <div>NOTHING</div>
      }
    </div>
  )
}

export default GenerateBlog