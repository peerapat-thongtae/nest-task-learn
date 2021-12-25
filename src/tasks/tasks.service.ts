import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks: Array<any> = [];

  getAllTasks() {
    return this.tasks;
  }
}
