import { SignupForm } from "@/components/signup-form";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center px-3 sm:min-h-[800px]">
      <SignupForm />
    </main>
  );
}
