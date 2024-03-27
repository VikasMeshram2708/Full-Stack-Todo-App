import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const DecodeToken = () => {
  try {
    const token = cookies().get("todoAuth")?.value || "";
    if (!token) {
      return console.log('No Authorization Token Found.')
    }
    const data = jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if(err) {
        throw new Error("User Authentication Failed.")
      } else {
        return user;
      }
    });
    return data;
  } catch (error) {
    return console.log("Something went wrong. Failed to Authenticate the user");
  }
};
