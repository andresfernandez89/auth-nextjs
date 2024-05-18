import { z } from "zod";

export const SignupFormSchema = z.object({
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

export type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export type Errors = {
  name?: string[];
  email?: string[];
  password?: string[];
};

export type SignupResult = {
  errors?: Errors;
};
