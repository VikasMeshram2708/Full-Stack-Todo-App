import * as z from "zod";

export const TodoSchema = z.object({
  todo: z.string().email(),
  done: z.boolean(),
});

export type TodoSchemaType = z.infer<typeof TodoSchema>;
