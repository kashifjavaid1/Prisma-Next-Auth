import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (request: NextRequest) => {
  try {
    const { email } = await request.json();
    const existing = await prisma.user.findUnique({ where: { email: email } });
    return NextResponse.json({ existing });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
};

export const GET = (request: NextRequest) => {
  try {
    return NextResponse.json({ message: "hello" });
  } catch (error) {
    return NextResponse.json({ error });
  }
};

export const POST = (request: NextRequest) => {
  try {
    return NextResponse.json({ message: "post" });
  } catch (error) {
    return NextResponse.json({ error });
  }
};
