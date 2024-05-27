"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { type User } from "@prisma/client";
//import { PrismaClient, type User } from "@prisma/client";
//import { PrismaClient, type User } from "@prisma/client";
import * as jose from "jose";
import { cookies } from "next/headers";

//const prisma = new PrismaClient();
//const prisma = new PrismaClient();
export async function encrypt(userId: Number) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";

  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setExpirationTime("2h")
    .setSubject(userId.toString())
    .sign(secret);
  return jwt;
}

export async function getCookies() {
  const sessionGoogle = await auth();
  if (sessionGoogle) {
    return "logoutGoogle";
  }
  //const cookie = cookies().get("session");
  return "logoutSession";
}

export async function decrypt() {
  const cookie = cookies().get("session");
  const sessionGoogle = await auth();
  if (cookie) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwt = cookie.value;
    try {
      await jose.jwtVerify(jwt, secret, {});
      return true;
    } catch (error) {
      console.log(error);
    }
  } else if (sessionGoogle) {
    return true;
  }
  return null;
}

export async function setSession(token: string): Promise<void> {
  cookies().set("session", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 30 * 60 * 1000),
    sameSite: "strict",
    path: "/",
  });
  return;
}

export async function createUser(
  name: string,
  email: string,
  hash: string,
): Promise<User> {
  return await prisma.user.create({
    data: { name, email, password: hash },
  });
}

export async function findUser(email: string): Promise<User | undefined> {
  console.log("usuario", email);
  const userFound = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!userFound) {
    return;
  }
  return userFound;
}
