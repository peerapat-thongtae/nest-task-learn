import { EntityRepository, Repository } from 'typeorm';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Task } from './tasks.entity';

// Custom Repository Tasks
// collect get create delete
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getAllTasks(filterDto: FilterTaskDto): Promise<Task[]> {
    const { status, search } = filterDto;
    // const tasks = this.taskRepository.find();
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
