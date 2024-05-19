import { z } from "zod";

export const SignUpFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at leaste 3 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(6, { message: "Be at least 6 characters long." })
    .trim(),
});

export type SignUpInputs = {
  name: string;
  email: string;
  password: string;
};

export type SignUpErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
};

export type SignUpResult = {
  errors?: SignUpErrors;
};

export const SignInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(6, { message: "Invalid email." }).trim(),
});

export type SignInInputs = {
  email: string;
  password: string;
};

export type SignInErrors = {
  email?: string[];
  password?: string[];
};

export type SignInResult = {
  errors?: SignInErrors;
};
