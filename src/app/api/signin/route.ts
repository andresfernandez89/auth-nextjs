import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    return Response.json(
      {
        error: "Invalid email or password",
      },
      { status: 400 },
    );
  }
  const isCorrectPassword = bcrypt.compareSync(password, user.password);
  if (!isCorrectPassword) {
    return Response.json(
      {
        error: "Invalid email or password",
      },
      { status: 400 },
    );
  }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";

  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setExpirationTime("2h")
    .setSubject(user.id.toString())
    .sign(secret);

  return NextResponse.json({ token: jwt });
}
