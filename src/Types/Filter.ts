import { Priority } from "./Priority"
import { z } from 'zod';

export type Filter = {
    priority:Priority|undefined,
    completed:boolean|undefined
}

export const FilterSchema = z.object({
  priority: z.union([z.nativeEnum(Priority), z.literal("ALL")]).optional(),
  completed: z.union([z.literal("ALL"), z.literal("true"), z.literal("false"),z.boolean()]).optional(),
});

export type FilterInput = z.infer<typeof FilterSchema>;