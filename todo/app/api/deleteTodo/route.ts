import { Todos, clientInstance } from "@/helpers/Db";
import { MongoServerError, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    // console.log("inco", reqBody.todoId);

    // Connect to DB
    await clientInstance.connect();

    // Query to DB
    await Todos.deleteOne({
      _id: new ObjectId(reqBody?.todoId),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Todo Removed.",
        data: reqBody,
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
          message: `Something went wrong. Failed to delete the Todos: ${e.errmsg}`,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: `Something went wrong. Failed to delete the Todos: ${err?.message}`,
      },
      {
        status: 500,
      }
    );
  }
};
