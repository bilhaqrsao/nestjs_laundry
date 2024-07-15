import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsNotEmpty({ message: 'Nama role tidak boleh kosong' })
  @IsString({ message: 'Nama role harus berupa kata' })
  name: string;

  @IsString({ message: 'Deskripsi harus berupa kata' })
  description: string;
}
