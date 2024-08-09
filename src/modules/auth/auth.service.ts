import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import * as bcrypt from 'bcrypt';
import { consts } from 'src/config/constants';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(User) private repo: Repository<User>,
  ) {}

  async signupUser(signupDto: SignupDto): Promise<SignupDto | ExceptionsHandler> {
    signupDto.role = 'manager'; // Use manager as default role

    // check if user already exists in db before saving to db
    const [user] = await this.repo.findBy({ email: signupDto.email });
    if (user) throw new UnprocessableEntityException('User already exists with given information');

    // Hash password before saving to db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(signupDto.password, salt);
    signupDto.password = hashedPassword;

    // save user to db and return the saved user object
    return this.repo.save(signupDto);
  }

  async profile(id: number) {
    /* Check if user exists in db */
    const [user] = await this.repo.findBy({ id });

    /* If no user found with given email, return unauthenticated error */
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async validateUser({ email, password }: LoginDto) {
    /* Check if user exists in db */
    const [user] = await this.repo.findBy({ email });

    /* If no user found with given email, return unauthenticated error */
    if (!user) throw new UnauthorizedException('Invalid credentials');

    /* Use bcrypt to compare the given password with the hashed password in db */
    const match = await bcrypt.compare(password, user.password);

    /* If passwords don't match, return unauthenticated error */
    if (!match) throw new UnauthorizedException('Invalid credentials');

    /* If user exists and password matches, create a jwt token for the user */
    const payload = { id: user.id, email: user.email, role: user.role };
    const jwt = this.jwtService.sign(payload);
    return { token: jwt, ...payload };
  }

  setCookie(res: Response, payload: any) {
    const jwt = this.jwtService.sign(payload);
    res.cookie(consts.cookieName, jwt, {
      expires: new Date(Date.now() + this.configService.get('auth.ttl') * 1000),
      httpOnly: true,
    });
  }
}
