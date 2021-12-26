import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from './interface/jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class JWTSStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate(payload: JWTPayload) {
    const { username } = payload;
    const user = this.userRepository.getUserByUsername(username);

    return user;
  }
}
