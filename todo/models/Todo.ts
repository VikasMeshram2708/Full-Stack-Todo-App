import * as z from "zod";

export const TodoSchema = z.object({
  todo: z
    .string()
    .min(2, {
      message: "Todo must be 2 or more characters long.",
    })
    .max(100, {
      message: "Todo must be 5 or fewer characters long.",
    }),
  done: z.boolean(),
});

export type TodoSchemaType = z.infer<typeof TodoSchema>;
