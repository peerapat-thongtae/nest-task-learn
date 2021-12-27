import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from './interface/jwt-payload.interface';
import { UserRepository } from './user.repository';
import * as config from 'config';
@Injectable()
export class JWTSStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
    });
  }

  async validate(payload: JWTPayload) {
    const { username } = payload;
    const user = this.userRepository.getUserByUsername(username);

    return user;
  }
}
