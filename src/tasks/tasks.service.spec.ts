import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskStatus } from './enum/task-status.enum';
import { TaskRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTaskRepository = () => ({
  getAllTasks: jest.fn(),
  findOne: jest.fn(),
  getTaskById: jest.fn(),
});

const mockUser = { id: 12, username: 'test' };

describe('TaskService', () => {
  let tasksService: any;
  let taskRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('get Tasks', () => {
    it('get all tasks from repository', async () => {
      taskRepository.getAllTasks.mockResolvedValue('someValue');
      expect(taskRepository.getAllTasks).not.toHaveBeenCalled();
      const filters: FilterTaskDto = {
        status: TaskStatus.IN_PROGRESS,
        search: '',
      };
      const result = await tasksService.getAllTasks(filters, mockUser);
      expect(taskRepository.getAllTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('get task by id', () => {
    it('find one and successful', async () => {
      const mockTask = {
        title: 'test title',
        description: 'test description',
      };
      taskRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById(1, mockUser);
      expect(result).toEqual(mockTask);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1, userId: mockUser.id },
      });
    });

    it('throw error task not found', async () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
