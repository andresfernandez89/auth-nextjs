import { encrypt, findUser } from "@/lib/lib";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const user = await findUser(email);
  if (!user) {
    return Response.json(
      {
        error: "Invalid email",
      },
      { status: 400 },
    );
  }
  const isCorrectPassword = bcrypt.compareSync(password, user.password);
  if (!isCorrectPassword) {
    return Response.json(
      {
        error: "Invalid password",
      },
      { status: 400 },
    );
  }

  const jwt = await encrypt(user.id);

  return NextResponse.json({ token: jwt });
}
