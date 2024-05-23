"use server";
import {
  SignInFormSchema,
  SignInInputs,
  SignInResult,
  SignUpFormSchema,
  SignUpInputs,
  SignUpResult,
} from "@/lib/definitions";
import { setSession } from "@/lib/lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(formData: SignUpInputs): Promise<SignUpResult> {
  const validatedFields = SignUpFormSchema.safeParse({
    name: formData.name,
    email: formData.email,
    password: formData.password,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(process.env.ROOT_URL + "/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validatedFields.data),
  });

  const json = await res.json();
  if (json.error === "User already exist") {
    return { errors: { email: ["User already exist"] } };
  }
  await setSession(json.token);
  if (res.ok) {
    redirect(`/dashboard`);
  } else {
    return json.error;
  }
}

export async function signin(formData: SignInInputs): Promise<SignInResult> {
  const validatedFields = SignInFormSchema.safeParse({
    email: formData.email,
    password: formData.password,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(process.env.ROOT_URL + "/api/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validatedFields.data),
  });

  const json = await res.json();

  if (json.error === "Invalid email") {
    return { errors: { email: ["Invalid email"] } };
  } else if (json.error === "Invalid password") {
    return { errors: { password: ["Invalid password"] } };
  }
  await setSession(json.token);

  if (res.ok) {
    redirect(`/dashboard`);
  } else {
    return json.error;
  }
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/signin");
}
