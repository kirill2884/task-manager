import { TaskService } from "../services/TaskService";
import { prisma } from "./PrismaClient";

export const TaskServiceInst = new TaskService(prisma)