// Todo: Logout Route

import { User, clientInstance } from "@/helpers/Db";
import { LogoutSchema, LogoutSchemaType } from "@/models/User";
import { MongoServerError } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  try {
    const reqBody: LogoutSchemaType = await req.json();

    // Sanitize the Incoming data
    LogoutSchema.parse(reqBody);
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

    // Destroy Cookies
    // cookies().delete("todoAuth");
    cookies().set("todoAuth", "", {
      httpOnly: true,
      expires: Date.now()
    });

    return NextResponse.json(
      {
        success: true,
        message: "User Logged Out.",
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
    console.log("Connection Released.");
  }
};
