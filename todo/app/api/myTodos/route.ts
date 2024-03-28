import { Todos, User, clientInstance } from "@/helpers/Db";
import { DecodeToken } from "@/helpers/DecodeToken";
import { MongoServerError, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const data = DecodeToken();
    console.log(data);

    // @ts-ignore
    const userId = data?.id;
    console.log(userId);
    // 66043a62276b9b9ee36a1164

    // Connect to DB
    await clientInstance.connect();
    const userExist = await User.findOne({ _id: new ObjectId(userId) });

    if (!userExist) {
      return NextResponse.json(
        {
          success: false,
          message: "Unathroized User Deteced",
        },
        {
          status: 500,
        }
      );
    }

    // Connect to DB
    await clientInstance.connect();

    // Retrieve user Todos
    const myTodos = await Todos.find({
      userId: new ObjectId(userId),
    }).toArray();

    const todosList = myTodos.reverse();

    return NextResponse.json(
      {
        success: true,
        data: todosList,
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
          message: `Something went wrong. Failed to retrieve the Todos: ${e.errmsg}`,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: `Something went wrong. Failed to retrieve the Todos: ${err?.message}`,
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

