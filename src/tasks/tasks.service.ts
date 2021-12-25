import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './enum/task-status.enum';
import { Task } from './tasks.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}
  private tasks: Task[] = [];

  // getAllTasks() {
  //   return this.tasks;
  // }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task) throw new NotFoundException(`Task id ${id} not found !`);

    return task;
  }

  // deleteTaskById(id: string): boolean {
  //   // this.tasks = this.tasks.filter((task) => task.id !== id);
  //   // return true;
  // }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await task.save();

    return task;
  }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   // const task = this.getTaskById(id);
  //   // if (task) {
  //   //   task.status = status;
  //   // }

  //   // return task;
  // }
}
