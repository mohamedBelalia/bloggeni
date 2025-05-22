"use server";

import { z } from "zod";

import { createClient } from "@/utils/supabase/server";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const forgotPassword = async ({ email }: { email: string }) => {
  const forgotPasswordValidation = forgotPasswordSchema.safeParse({
    email,
  });

  if (!forgotPasswordValidation.success) {
    return {
      error: true,
      message:
        forgotPasswordValidation.error.issues[0]?.message ?? "An error occured",
    };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  console.log("err: ", error);
  if (error === null) {
    return {
      error: true,
      message: "No such email registered",
    };
  }

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    success: true,
    message:
      "If an account exists, a password reset email has been sent. Please check your inbox.",
  };
};
