import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRoleDto) {
    try {
      const newRole = await this.prisma.role.create({
        data: {
          ...dto,
        },
      });

      return newRole;
    } catch {
      return 'Data tidak ditemukan';
    }
  }

  findAll() {
    try {
      const allRoles = this.prisma.role.findMany();
      return allRoles;
    } catch {
      return 'Data tidak ditemukan';
    }
  }

  findOne(id: number) {
    try {
      const role = this.prisma.role.findUnique({
        where: { id },
      });

      return role;
    } catch {
      return 'Data tidak ditemukan';
    }
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const updatedRole = this.prisma.role.update({
        where: { id },
        data: updateRoleDto,
      });

      return updatedRole;
    } catch {
      return 'Data tidak ditemukan';
    }
  }

  remove(id: number) {
    try {
      const deletedRole = this.prisma.role.delete({
        where: { id },
      });

      return deletedRole;
    } catch {
      return 'Data tidak ditemukan';
    }
  }
}
