import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    redirect("/blog-generator");
  }

  return <div className="w-full mx-auto md:h-screen h-fit md:py-0 py-12 flex justify-center items-center">
    <LoginForm />
  </div>;
}
