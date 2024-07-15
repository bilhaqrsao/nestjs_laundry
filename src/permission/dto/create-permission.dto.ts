import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'Nama permission tidak boleh kosong' })
  @IsString({ message: 'Nama permission harus berupa kata' })
  name: string;

  @IsString({ message: 'Deskripsi harus berupa kata' })
  description: string;

  @IsString({ message: 'Status harus True or False' })
  status: string;
}
