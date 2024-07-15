import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { PrismaService } from 'src/prisma.service';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, PrismaService],
})
export class PermissionModule {
  @IsNotEmpty({ message: 'Nama permission tidak boleh kosong' })
  @IsString({ message: 'Nama permission harus berupa kata' })
  name: string;

  @IsString({ message: 'Deskripsi harus berupa kata' })
  description: string;

  @IsNotEmpty({ message: 'Permission tidak boleh kosong' })
  @IsBoolean({ message: 'Permission harus "YA" atau "TIDAK"' })
  status: boolean;
}
