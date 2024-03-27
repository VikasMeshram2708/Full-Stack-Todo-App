import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const DecodeToken = () => {
  try {
    const token = cookies().get("todoAuth")?.value || "";
    if (!token) {
      throw new Error("No Authorization Token Found.");
    }
    const data = jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if(err) {
        throw new Error("User Authentication Failed.")
      } else {
        return user;
      }
    });
    return data;
    // if (!verifyToken) {
    //   throw new Error("Token Verification Failed.");
    // }
    // console.log('decoded-token-data', verifyToken)
    // return verifyToken;
  } catch (error) {
    return console.log("Something went wrong. Failed to Authenticate the user");
  }
};
