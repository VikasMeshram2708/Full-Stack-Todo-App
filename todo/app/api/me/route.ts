// Todo: Get User Deatils

import { User, clientInstance } from "@/helpers/Db";
import { MongoServerError, ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { DecodeToken } from "@/helpers/DecodeToken";

export const GET = async () => {
  try {
    // GET the User id
    const user = DecodeToken();
    // @ts-ignore
    const userId = new ObjectId(user.id);
    // const userId = JSON.stringify(user?.id);
    console.log(userId);

    // Query the DB with that UserId
    const data = await User.findOne({
      _id: userId,
    });
    const userData = [
      {
        id: data?._id,
        name: data?.name,
        email: data?.email,
        isVerified: data?.isVerified,
        isAdmin: data?.isAdmin,
      },
    ];

    return NextResponse.json(
      {
        sucess: true,
        data: userData,
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
