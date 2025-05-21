import { defineAction, type ActionAPIContext} from 'astro:actions';
import { TaskService } from '../services/TaskService';
import { TaskSchema} from '../Types/Task';
import z from 'zod';
import { FilterSchema, type Filter} from '../Types/Filter';

const taskService = new TaskService();

export const tasks = {
create: defineAction({
    accept:"form",
    input: TaskSchema,
    handler: async (formData) => {
      try {
        const task = await taskService.createTask(formData);
        return {success: true, task: task};
      } catch (err: any) {
        return { error: err.message };
      }
    },
  }),
  select: defineAction({
    accept:"form",
    input: TaskSchema.extend({ id: z.number() }),
    handler: async ({ id, ...data }) => {
      try {
        const task = await taskService.selectTask(id,data);
        return {success: true, task: task};
      } catch (err: any) {
        return { error: err.message };
      }
    },
  }),
  getAll: defineAction({
    input: FilterSchema.optional(),
    handler: async (filter) => {
        try {
            const tasks = await taskService.getAllTasks(filter);
            return {success: true, tasks };
        } catch (err: any) {
            return { error: err.message };
        }
        },
    }),
  setFilter: defineAction({
    accept:"form",
    input: FilterSchema,
    handler: async (formData) => {
        try {
          const filter:Filter = {  
            priority: formData.priority === 'ALL' ? undefined : formData.priority,
            completed: formData.completed === 'ALL' ? undefined :
                       formData.completed === 'true' ? true :
                       formData.completed === 'false' ? false : undefined
            } 
            await taskService.setFilter(filter);
            
            return {
              redirect:'/'
            };
        } catch (err: any) {
            return { error: err.message };
        }
        },
    }),
  getSelected: defineAction({
    input: z.object({}),
    handler: async () => {
        try {          
            const task = await taskService.getSelectedTask();
            return {success: true, task };
        } catch (err: any) {
            return { error: err.message };
        }
        },
  }),
  getFilter: defineAction({
  input: z.object({}),
  handler: async () => {
      try {
        const filter = await taskService.getFilter();
          return {success: true, filter };
      } catch (err: any) {
            return { error: err.message };
      }
      },
  }),
  delete: defineAction({
      accept:"form",
      input:z.object({
        id:z.number()
      }),
      handler: async ({ id, ...data }) => {
        try{
          const deletedTask = await taskService.deleteTask(id)
          return { success: true, task: deletedTask };
        } catch (error: any){
          return { error: error.message || 'Failed to delete task' };
        }

      }
  }),
    update: defineAction({
      accept:"form",
      input:TaskSchema.extend({ id: z.number() }),
      handler: async ({ id, ...data }) => {
        try{
          const updatedTask = await taskService.updateTask(id,data)
          return { success: true, task: updatedTask };
        } catch (error: any){
          return { error: error.message || 'Failed to update task' };
        }

      }
  }),
    complite: defineAction({
      accept:"form",
      input:z.object({
        id:z.number()
      }),
      handler: async (formData) => {
        try{
          const completedTask = await taskService.compliteTask(formData.id)
          return { success: true, task: completedTask };
        } catch (error: any){
          return { error: error.message || 'Failed to complite task' };
        }

      }
  })
};


