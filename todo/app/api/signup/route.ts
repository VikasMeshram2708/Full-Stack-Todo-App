// Todo: Sign UP Route

import { User } from "@/helpers/Db";
import { UserSchema, UserSchemaType } from "@/models/User";
import { MongoError, MongoServerError } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const reqBody: UserSchemaType = await req.json();

    // Sanitize the Incoming data
    UserSchema.parse(reqBody);
    Promise.resolve();

    // Check if the Email is already in use
    const userExist = await User.findOne({ email: reqBody.email });

    // If Email exist throw Error
    if (userExist) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already in use.",
        },
        {
          status: 422,
        }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(reqBody.password, 10);

    // Save the User
    const newUser = {
      name: reqBody.name,
      email: reqBody.email,
      password: hashedPassword,
      created_at: new Date().toLocaleDateString()
    };

    await User.insertOne(newUser);

    return NextResponse.json(
      {
        success: true,
        message: "User Registred",
      },
      {
        status: 201,
      }
    );
  } catch (e) {
    const err = e as Error;
    if (e instanceof MongoServerError) {
      return NextResponse.json(
        {
          success: false,
          message: `Something went wrong. Failed to Register the user. : ${e}`,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: `Something went wrong. Failed to Register the user. : ${err?.message}`,
      },
      {
        status: 500,
      }
    );
  }
};
