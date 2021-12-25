import { compare } from 'bcrypt';
import {
  BaseEntity,
  Column,
  Entity,
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

  async validatePassword(password: string): Promise<boolean> {
    const isMatch = await compare(password, this.password);
    if (!isMatch) {
      // throw new BadRequestException('Invalid password !');
      return false;
    }
    return true;
  }
}
