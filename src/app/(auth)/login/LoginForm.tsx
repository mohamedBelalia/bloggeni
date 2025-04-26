
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { passwordSchema } from "@/validation/passwordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginUser } from "./action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import GoogleSignin from "./GoogleSignin";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true); // Set loading to true when submission starts

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (response.error) {
        setServerError(response.message);
      } else {
        // Redirect to the dashboard page
        router.push("/blog-generator");
      }
    } catch (error) {
      console.log(error);
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Set loading to false when submission ends
    }
  };

  // pass the email value to forget password page
  // const email = form.getValues("email");

  return (
    <main className="flex flex-col justify-center items-center h-full">

      <div className="mb-9">
        <h2 className="text-[#652293] text-center text-3xl font-semibold">
          Welcome Back
        </h2>
      </div>

      <div className="md:w-[380px] w-full">

        <div className="mb-10">
          <GoogleSignin />
        </div>

        <div className="flex justify-center items-center mb-5">
          <Image
            src="/dash_seprator.svg"
            alt="Google logo"
            width={300}
            height={60}
          />
        </div>

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#652293]">Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#652293]">Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {serverError && (
                <p className="text-red-500 text-sm mt-2">{serverError}</p>
              )}
              {/* <Button type="submit">Register</Button> */}
              <Button className="cursor-pointer bg-[#076d81] hover:bg-[#076d81] py-5" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              {/* <GoogleSignin /> */}
            </form>
          </Form>
        </div>

        <div className="flex-col gap-2 mt-5">
          <div className="text-center font-medium text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Register
            </Link>
          </div>
          {/* <div className="text-muted-foreground text-sm">
            Forgot password?{" "}
            <Link
              href={`/forgot-password${email ? `?email=${encodeURIComponent(email)}` : ""
                }`}
              className="underline"
            >
              Reset my password
            </Link>
          </div> */}
        </div>
      </div>
    </main>
  );
}
