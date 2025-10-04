import { z } from "zod";

export const Transaction = z.object({
  id: z.string(),
  userId: z.string(),
  accountId: z.string(),
  date: z.string(),
  name: z.string(),
  merchant: z.string().nullable(),
  amount: z.number(),
  pending: z.boolean().default(false),
  category: z.string().nullable(),
});
export type Transaction = z.infer<typeof Transaction>;

