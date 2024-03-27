// Todo: Sign In Route

import { User, clientInstance } from "@/helpers/Db";
import { LoginSchema, LoginSchemaType } from "@/models/User";
import { MongoServerError } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const reqBody: LoginSchemaType = await req.json();

    // Sanitize the Incoming data
    LoginSchema.parse(reqBody);
    Promise.resolve();

    // Check if the Email Exists OR not
    const userExist = await User.findOne({ email: reqBody.email });

    // If Email doesn't exist throw Error
    if (!userExist) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Email provided.",
        },
        {
          status: 422,
        }
      );
    }

    // Compare the Hashed Password
    const comparePassword = await bcrypt.compare(
      reqBody.password,
      userExist.password
    );

    // If password Validation Failed throw Error
    if (!comparePassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Credentials Provided.",
        },
        {
          status: 422,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User Logged In.",
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
  } finally {
    await clientInstance.close();
    console.log('Connection Released.')
  }
};
