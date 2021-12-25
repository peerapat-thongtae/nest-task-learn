import { ConflictException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    const checkUser = await this.findOne({ username });

    if (checkUser) {
      throw new ConflictException(`user ${username} already exists`);
    }

    const salt = await bcrypt.genSalt();
    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password, salt);
    await user.save();
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.findOne({ username });
    if (!user) {
      throw new NotFoundException(`user ${username} not found !`);
    }
    return user;
  }

  async validateUser(authCredentials: AuthCredentialsDto): Promise<boolean> {
    const { username, password } = authCredentials;
    const user = await this.getUserByUsername(username);
    const validatePassword = await user.validatePassword(password);
    if (!validatePassword) {
      return false;
    }

    return true;
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
