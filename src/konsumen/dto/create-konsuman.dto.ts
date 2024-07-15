// src/konsumen/dto/create-konsuman.dto.ts
import { IsNotEmpty } from 'class-validator';

export class CreateKonsumanDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  nama: string;
}
