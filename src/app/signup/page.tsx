"use client";
import { signup } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignUpFormSchema, SignUpInputs } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    try {
      signup(data);
    } catch (error) {
      throw new Error("Errores");
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
          {errors?.email && (
            <p className="ml-1 text-sm text-red-500">{errors?.email.message}</p>
          )}
        </div>
        <div className="mb-6 grid w-full  items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" {...register("password")} type="password" />
          {errors?.password && (
            <p className="ml-1 text-sm text-red-500">
              {errors?.password.message}
            </p>
          )}
        </div>
        <div className="mt-8 text-right">
          <Button type="submit">Sign up</Button>
        </div>
      </form>
    </main>
  );
}
