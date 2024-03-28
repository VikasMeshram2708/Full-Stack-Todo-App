import { Todos, clientInstance } from "@/helpers/Db";
import { MongoServerError, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();

    // Connect to DB
    await clientInstance.connect();

    // Query to DB
    await Todos.updateOne(
      {
        _id: new ObjectId(reqBody?.todoId),
      },
      {
        $set: { todo: reqBody.todo },
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Todo Updated.",
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
          message: `Something went wrong. Failed to update the Todo: ${e.errmsg}`,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: `Something went wrong. Failed to update the Todo: ${err?.message}`,
      },
      {
        status: 500,
      }
    );
  }
};
