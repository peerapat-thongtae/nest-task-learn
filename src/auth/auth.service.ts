import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentials);
  }

  async signIn(authCredentials: AuthCredentialsDto): Promise<void> {
    const validateUser = this.userRepository.validateUser(authCredentials);

    if (!validateUser) {
      throw new UnauthorizedException('username or password invalid !');
    }
  }
}
