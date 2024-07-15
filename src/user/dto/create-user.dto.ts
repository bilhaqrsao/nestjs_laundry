import { IsNotEmpty, IsString, IsEmail, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Photo tidak boleh kosong' })
  @IsString()
  photo: string;

  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: 'Role ID tidak boleh kosong' })
  @IsInt({ message: 'Role ID harus berupa angka' })
  roleId: number;
}
