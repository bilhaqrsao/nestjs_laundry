import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { IsPasswordMatching } from '../password-confirmation.decorator';

export class RegisterUserDto {
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

  @IsNotEmpty({ message: 'Konfirmasi Password tidak boleh kosong' })
  @IsString()
  @IsPasswordMatching('password', {
    message: 'Password dan Konfirmasi Password harus sama',
  })
  confirmPassword: string;
}
