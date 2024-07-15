import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePermissionDto) {
    try {
      const newPermission = await this.prisma.permission.create({
        data: dto, // Provide the correct type for the 'data' property
      });

      return newPermission;
    } catch {
      return 'Data tidak ditemukan';
    }
  }

  findAll() {
    try {
      const allPermissions = this.prisma.permission.findMany();
      return allPermissions;
    } catch {
      return 'Data tidak ditemukan';
    }
  }

  findOne(id: number) {
    try {
      const permission = this.prisma.permission.findUnique({
        where: { id }, // Provide the correct type for the 'where' property
      });

      return permission;
    } catch {
      return 'Data tidak ditemukan';
    }
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    try {
      const updatedPermission = await this.prisma.permission.update({
        where: { id }, // Provide the correct type for the 'where' property
        data: updatePermissionDto, // Provide the correct type for the 'data' property
      });

      return updatedPermission;
    } catch {
      return 'Data tidak ditemukan';
    }
  }

  remove(id: number) {
    try {
      const deletedPermission = this.prisma.permission.delete({
        where: { id }, // Provide the correct type for the 'where' property
      });

      return deletedPermission;
    } catch {
      return 'Data tidak ditemukan';
    }
  }
}
