// Todo: Login In Route

import { User, clientInstance } from "@/helpers/Db";
import { LoginSchema, LoginSchemaType } from "@/models/User";
import { MongoServerError } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { ZodError } from "zod";

export const POST = async (req: NextRequest) => {
  try {
    const reqBody: LoginSchemaType = await req.json();

    // Sanitize the Incoming data
    LoginSchema.parse(reqBody);

    // Connect to DB
    await clientInstance.connect();

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

    /** *TODO: Create Token Data */
    const payload = {
      id: userExist._id,
      name: userExist.name,
      email: userExist.email,
    };

    // CREATE : Token
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    // Set Cookies
    cookies().set("todoAuth", token, {
      httpOnly: true,
    });

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
          message: `Something went wrong. Failed to Login the user. : ${e}`,
        },
        {
          status: 500,
        }
      );
    }
    if (e instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: `Something went wrong. Failed to Login the user. : ${e?.errors[0]?.message}`,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: `Something went wrong. Failed to Login the user. : ${err?.message}`,
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
