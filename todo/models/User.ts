import * as z from "zod";

export const UserSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be 2 or more characters long.",
    })
    .max(100, {
      message: "Name must be 5 or fewer characters long.",
    }),
  email: z.string().email(),
  password: z
    .string()
    .min(5, {
      message: "Password must be 5 or more characters long.",
    })
    .max(100, {
      message: "Password must be 5 or fewer characters long.",
    }),
  isVerified: z.boolean().default(false),
  isAdmin: z.boolean().default(false),
});

// Login Schema
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, {
      message: "Name must be 2 or more characters long.",
    })
    .max(100),
});
// Login Schema type
export type LoginSchemaType = z.infer<typeof LoginSchema>;

export type UserSchemaType = z.infer<typeof UserSchema>;
