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
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createPermissionDto: CreatePermissionDto) {
    try {
      return this.permissionService.create(createPermissionDto);
    } catch {
      return 'Data tidak dapat ditambahkan';
    }
  }

  @Get()
  findAll() {
    try {
      return this.permissionService.findAll();
    } catch {
      return 'Data tidak ditemukan';
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.permissionService.findOne(+id);
    } catch {
      return 'Data tidak ditemukan';
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    try {
      return this.permissionService.update(+id, updatePermissionDto);
    } catch {
      return 'Data tidak ditemukan';
    }
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Param('id') id: string) {
    try {
      return this.permissionService.remove(+id);
    } catch {
      return 'Data tidak ditemukan';
    }
  }
}
