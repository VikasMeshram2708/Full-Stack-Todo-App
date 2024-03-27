import { Todos, User, clientInstance } from "@/helpers/Db";
import { MongoServerError, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { TodoSchema, TodoSchemaType } from "@/models/Todo";
import { DecodeToken } from "@/helpers/DecodeToken";

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const data = DecodeToken();

    // @ts-ignore
    const userId = data?.id;

    const { done, todo } = reqBody;

    // Connect to DB
    await clientInstance.connect();

    // check if the userId is valid or not
    const userExist = await User.findOne({
      _id: new ObjectId(userId),
    });

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

    // Sanitize the Incoming data
    TodoSchema.parse({ todo, done });
    await Promise.resolve();

    // Create Todo Object
    const userTodos = {
      todo: reqBody.todo,
      done: reqBody.done,
      userId: userExist._id,
      created_at: new Date().toDateString(),
    };

    // Connect to DB
    await clientInstance.connect();
    // Insert into DB
    await Todos.insertOne(userTodos);

    return NextResponse.json(
      {
        success: true,
        message: "Todo Saved",
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
          message: `Something went wrong. Failed to Save the Todo: ${e.errmsg}`,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: `Something went wrong. Failed to Save the Tood: ${err?.message}`,
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
