import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from 'bcrypt';
import { RegisterDto } from "./dto/register-user.dto";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string, user: any }> {
    const { username, password } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new UnauthorizedException('Invalid password');
    }

    // Delete existing token for this user
    await this.prisma.authToken.deleteMany({
      where: { userId: user.id },
    });

    const payload = { id: user.id, username: user.username };
    const token = this.jwtService.sign(payload);

    await this.prisma.authToken.create({
      data: { token, user: { connect: { id: user.id } } },
    });

    return { user: user, access_token: token };
  }

  async register(dto: RegisterDto) {
    const { email, username, password, name, photo } = dto;

    const existingEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      throw new BadRequestException('Email already registered');
    }

    const existingUsername = await this.prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      throw new BadRequestException('Username already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name,
        photo,
        roleId: 1, // Set default roleId to 1
      },
    });    

    return newUser;
  }

  async logout(token: string) {
    const deleteResult = await this.prisma.authToken.deleteMany({
      where: { token },
    });

    if (!deleteResult.count) {
      throw new UnauthorizedException('Logout failed');
    }

    return deleteResult;
  }
}
