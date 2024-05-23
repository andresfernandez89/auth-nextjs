import { createUser, encrypt, findUser } from "@/lib/lib";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  const user = await findUser(email);
  if (user) {
    return Response.json({
      error: "User already exist",
    });
  }

  const hash = bcrypt.hashSync(password, 8);

  const { id } = await createUser(name, email, hash);

  const isCorrectPassword = bcrypt.compareSync(password, hash);
  if (!isCorrectPassword) {
    return Response.json(
      {
        error: "Invalid password",
      },
      { status: 400 },
    );
  }

  const jwt = await encrypt(id);

  return NextResponse.json({ token: jwt });
}
