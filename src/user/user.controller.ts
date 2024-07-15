import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      return await this.userService.register(registerUserDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username or email already registered');
      }
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('Super Admin', 'Developer', 'Admin', 'User')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username or email already registered');
      }
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('Super Admin', 'Developer', 'Admin', 'User')
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('Super Admin', 'Developer')
  async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(+id);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('Super Admin', 'Developer')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.update(+id, updateUserDto);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('Super Admin', 'Developer')
  async remove(@Param('id') id: string) {
    try {
      return await this.userService.remove(+id);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('Super Admin', 'Developer')
  async findByUsername(@Param('username') username: string) {
    try {
      return await this.userService.findByUsername(username);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
