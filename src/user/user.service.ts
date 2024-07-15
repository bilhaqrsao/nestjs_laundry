import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterUserDto) {
    try {
      const { email, username, password, name, photo } = dto;

      // Check if email already exists
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: email },
      });

      if (existingEmail) {
        throw new BadRequestException('Email already registered');
      }

      // Check if username already exists
      const existingUsername = await this.prisma.user.findUnique({
        where: { username: username },
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
    } catch (error) {
      throw error;
    }
  }

  async create(dto: CreateUserDto) {
    try {
      const { email, username, password, name, photo, roleId } = dto;

      // Check if email already exists
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: email },
      });

      if (existingEmail) {
        throw new BadRequestException('Email already registered');
      }

      // Check if username already exists
      const existingUsername = await this.prisma.user.findUnique({
        where: { username: username },
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
          roleId: Number(roleId),
        },
      });

      return newUser;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error('Failed to register user');
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany({
        include: {
          role: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          role: true,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true, // Include role if needed
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { id },
      });

      if (!deletedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

  async findByUsername(username: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { username },
        include: {
          role: true,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with username ${username} not found`);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
