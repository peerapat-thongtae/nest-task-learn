import { compare } from 'bcrypt';
import { Task } from '../tasks/tasks.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const isMatch = await compare(password, this.password);
    if (!isMatch) {
      // throw new BadRequestException('Invalid password !');
      return false;
    }
    return true;
  }
}
