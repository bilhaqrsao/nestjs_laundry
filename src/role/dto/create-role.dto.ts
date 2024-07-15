import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Nama role tidak boleh kosong' })
  @IsString()
  name: string;

  @IsString()
  description: string;
}
