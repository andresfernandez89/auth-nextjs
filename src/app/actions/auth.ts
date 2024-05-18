import { FormInputs, SignupFormSchema, SignupResult } from "@/lib/definitions";
export async function signup(formData: FormInputs): Promise<SignupResult> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.name,
    email: formData.email,
    password: formData.password,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  return {};
}
