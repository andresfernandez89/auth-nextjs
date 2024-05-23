"use client";
import { signup } from "@/app/actions/auth";
import ErrorInput from "@/components/errorInput";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SignUpFormSchema,
  SignUpInputs,
  SignUpResult,
} from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const [ifUserExist, setIfUserExist] = useState<SignUpResult>({
    errors: { email: undefined },
  });

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    try {
      const ifUserExist = await signup(data);
      if (
        ifUserExist?.errors?.email &&
        ifUserExist?.errors?.email[0] === "User already exist"
      ) {
        setIfUserExist({ errors: { email: ifUserExist?.errors?.email } });
      } else {
        setIfUserExist({ errors: undefined });
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center px-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm rounded-md border-slate-600 px-6 sm:border-2 sm:py-8"
      >
        <CardHeader className="space-y-1 pl-0 pt-0">
          <CardTitle className="text-2xl">Create an account</CardTitle>
        </CardHeader>
        <div className="mb-6 grid w-full items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors?.name && (
            <p className="ml-1 text-sm text-red-500">{errors?.name.message}</p>
          )}
        </div>
        <div className="mb-6 grid w-full  items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register("email")} type="email" />
          {errors?.email && <ErrorInput message={errors?.email?.message} />}
          {ifUserExist?.errors?.email && (
            <ErrorInput message={ifUserExist.errors?.email[0]} />
          )}
        </div>
        <div className="mb-6 grid w-full  items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" {...register("password")} type="password" />
          {errors?.password && (
            <ErrorInput message={errors?.password.message} />
          )}
        </div>
        <div className="mt-8 text-right">
          <Button type="submit">Sign up</Button>
        </div>
        <Link href={"/signin"}>
          <p className="mt-8 text-center text-sm font-light">
            {`Already have an account?`}
            <span className="ml-2 font-semibold underline underline-offset-2">
              Sign In
            </span>
          </p>
        </Link>
      </form>
    </main>
  );
}
