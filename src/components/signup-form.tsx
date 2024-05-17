"use client";
import { signup } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm() {
  return (
    <form
      action={signup}
      className="w-full max-w-sm rounded border-slate-600 px-6  sm:border-2 sm:p-8"
    >
      <div className="mb-3 grid w-full items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" className="" />
      </div>
      <div className="mb-3 grid w-full  items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
      </div>
      <div className="mb-4 grid w-full  items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>
      <div className="mt-8 text-right">
        <Button type="submit">Sign up</Button>
      </div>
    </form>
  );
}
