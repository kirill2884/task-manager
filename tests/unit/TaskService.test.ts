import { TaskService } from '../../src/services/TaskService';
import { prisma } from '../../src/instanses/PrismaClient';
import redis from '../../src/instanses/Redis';
import type {TaskInput } from '../../src/Types/Task';

jest.mock('../../src/instanses/PrismaClient', () => ({
  prisma: {
    task: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    }
  }
}));

jest.mock('../../src/instanses/Redis', () => ({
  get: jest.fn(),
  set: jest.fn()
}));

const service = new TaskService();

describe('TaskService', () => {
  const mockTask: TaskInput = {
      title: 'Test task',
      description: 'Test description',
      priority: "LOW",
      dueDate: new Date(),
      completed: false,
  };

  it('getAllTasks: get all tasks', async () => {
    (prisma.task.findMany as jest.Mock).mockResolvedValue([mockTask]);

    const result = await service.getAllTasks();
    expect(result).toEqual([mockTask]);
    expect(prisma.task.findMany).toHaveBeenCalled();
  });

  it('getTaskById: returns task by ID', async () => {
    (prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask);

    const result = await service.getTaskById(1);
    expect(result).toEqual(mockTask);
    expect(prisma.task.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('createTask: creates a task', async () => {
    (prisma.task.create as jest.Mock).mockResolvedValue(mockTask);

    const result = await service.createTask(mockTask);
    expect(result).toEqual(mockTask);
    expect(prisma.task.create).toHaveBeenCalledWith({ data: mockTask });
  });

  it('deleteTask: deletes a task', async () => {
    (prisma.task.delete as jest.Mock).mockResolvedValue(mockTask);

    const result = await service.deleteTask(1);
    expect(result).toEqual(mockTask);
    expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('updateTask: updates a task', async () => {
    (prisma.task.update as jest.Mock).mockResolvedValue({ ...mockTask, title: 'Updated' });

    const result = await service.updateTask(1, { ...mockTask, title: 'Updated' });
    expect(result.title).toBe('Updated');
    expect(prisma.task.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { ...mockTask, title: 'Updated' }
    });
  });

  it('selectTask: saves selected task in Redis', async () => {
    await service.selectTask(1, mockTask);
    expect(redis.set).toHaveBeenCalledWith(
      'selectedTask',
      JSON.stringify({ id: 1, ...mockTask })
    );
  });

  it('getSelectedTask: retrieves task from Redis', async () => {
    (redis.get as jest.Mock).mockResolvedValue(JSON.stringify(mockTask));

    const result = await service.getSelectedTask();
    result.dueDate = new Date(result.dueDate);
    expect(result).toEqual(mockTask);
    expect(redis.get).toHaveBeenCalledWith('selectedTask');
  });

  it('compliteTask: completes a task', async () => {
    const completedTask = { ...mockTask, completed: true };
    (prisma.task.update as jest.Mock).mockResolvedValue(completedTask);

    const result = await service.compliteTask(1);
    expect(result.completed).toBe(true);
    expect(prisma.task.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { completed: true }
    });
  });
});
