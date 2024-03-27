import * as z from 'zod';

export const UserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(5).max(100),
});


// Login Schema
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(100),
});
// Login Schema type
export type LoginSchemaType = z.infer<typeof LoginSchema>


export type UserSchemaType = z.infer<typeof UserSchema>