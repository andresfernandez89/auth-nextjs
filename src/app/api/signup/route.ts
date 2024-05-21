import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;
  const hash = bcrypt.hashSync(password, 8);

  await prisma.user.create({
    data: { name, email, password: hash },
  });

  return NextResponse.json({});
}
