import { prisma } from '../instanses/PrismaClient';
import type {Task, TaskInput } from '../Types/Task';
import redis from '../instanses/Redis';
import type { Filter, FilterInput } from '../Types/Filter';

export class TaskService {

  constructor(private prismaClient = prisma){
  }

async getAllTasks(filter?: FilterInput) {
     
  try {

    const where: any = {};

    if (filter?.priority) {
      where.priority = filter.priority;
    }

    if (typeof filter?.completed === 'boolean') {
      where.completed = filter.completed;
    }

    const tasks = await this.prismaClient.task.findMany({ where , orderBy:[{dueDate:'desc'}]});
    return tasks;
  } catch (error) {
    throw new Error('[TASK SERVICE] Failed to get tasks');
  }
}

  async setFilter(filter:Filter){
      try {

        await redis.set(`filterTask`, JSON.stringify(filter));

        return filter
      } catch (error) {
        throw new Error('[TASK SERVICE] Failed to set filter');
      }
  }

  async getFilter(){
      try {

        const raw = await redis.get(`filterTask`);
        if (!raw) return null;

        return JSON.parse(raw);
      } catch (error) {
        throw new Error('[TASK SERVICE] Failed to get filter');
      }
  }

  async getTaskById(id:number){
      try {
            return await prisma.task.findUnique({
              where: { id }
            });
          } catch (error) {
            throw new Error(`[TASK SERVICE] Error getting task with id ${id}:`);
          }
      }

    async createTask(task: TaskInput){
      const { title, description, priority, dueDate, completed } = task;

      try {
        const newTask = await prisma.task.create({
          data: {
            title,
            description,
            priority,
            dueDate,
            completed
          }
        });

        return newTask;
      } catch (error) {
        throw new Error('[TASK SERVICE] Error create o task: ' + task.title);
      }
  }

  async deleteTask(id: number) {
    try {
      const deletedTask = await prisma.task.delete({
        where: {
          id: id, 
        },
      });

      return deletedTask;
    } catch (error) {
      throw new Error('[TASK SERVICE] Error delete operation of task with id: ' + id);
    }
  }

  async updateTask(id:number, task: TaskInput) {
    try {
      const updatedTask = await prisma.task.update({
        where: {
          id: id,
        },
        data: task,
      });

      return updatedTask;
    } catch (error) {
      throw new Error('[TASK SERVICE] Error updating of task with id:' + id);
    }
  }

  async selectTask(id:number, task: TaskInput) {
    try {
      const fullTask = { id, ...task };     
      await redis.set(`selectedTask`, JSON.stringify(fullTask));
    } catch (error) {
      throw new Error('[TASK SERVICE] Error selected operation of task with id: ' + id);
    }
  }

  async getSelectedTask() {
    try {
      const raw = await redis.get(`selectedTask`);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (error) {
      throw new Error('[TASK SERVICE] Error getting selected task:');
    }
  }
  
  async compliteTask(id: number) {
    try {
      const completedTask = await prisma.task.update({
        where: {
          id: id,
        },
        data: {
          completed:true
        }
      });

      return completedTask;
    } catch (error) {
      throw new Error('[TASK SERVICE] Failed to update task');
    }
  }


}