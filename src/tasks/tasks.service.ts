import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskStatus } from './enum/task-status.enum';
import { Task } from './tasks.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(filterDto: FilterTaskDto, user: User): Promise<Task[]> {
    const tasks = this.taskRepository.getAllTasks(filterDto, user);
    return tasks;
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!task) throw new NotFoundException(`Task id ${id} not found !`);

    return task;
  }

  async deleteTaskById(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const user = new User();
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();

    return task;
  }
}
