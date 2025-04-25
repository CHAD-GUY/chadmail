import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Get the data from the request
    const data = await request.json();

    // Check if the user already exists
    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create the user
    const newUser = await db.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    // Respond with the user data
    return NextResponse.json({
      data: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
      message: "User created",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while creating the user",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
