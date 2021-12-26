import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JWTPayload } from './interface/jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentials);
  }

  async signIn(
    authCredentials: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUser(authCredentials);

    if (!username) {
      throw new UnauthorizedException('credentials invalid !');
    }

    const payload: JWTPayload = { username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
