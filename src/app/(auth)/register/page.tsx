"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerUser } from "./action";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import GoogleSignin from "../login/GoogleSignin";
import Image from "next/image";

const formSchema = z
  .object({
    email: z.string().email(),
  })
  .and(passwordMatchSchema);

export default function Register() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });


  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true);

    try {
      const response = await registerUser({
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });

      if (response.error) {
        setServerError(response.message);
      } else {
        router.push("/register/confirmation");
      }
    } catch (error) {
      console.log(error)
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center md:min-h-screen h-fit md:py-0 py-12 w-full">
      <div className="mb-9">
        <h2 className="text-[#652293] text-center text-3xl font-semibold">Create Your <span className="bg-[#652293] text-white px-2 rounded-md">Turbo Blog</span> Account</h2>
      </div>
      <div className="">

        <div className="mb-10">
          <Suspense fallback={<div>Loading...</div>}>
            <GoogleSignin />
          </Suspense>
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
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#652293]">Password confirm</FormLabel>
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
                  "Register"
                )}
              </Button>
            </form>
          </Form>
        </div>

        <div className="flex-col gap-2 mt-3">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline font-semibold">
              Login
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
