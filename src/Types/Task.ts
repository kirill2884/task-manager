import { z } from 'zod';
import {Priority } from './Priority';

export type Task = {
  id?: number;
  title: string;
  description?: string | null;
  priority: keyof typeof Priority;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const TaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.nativeEnum(Priority),
  dueDate: z.coerce.date(),
  completed: z.boolean().optional().default(false),
});

export type TaskInput = z.infer<typeof TaskSchema>;