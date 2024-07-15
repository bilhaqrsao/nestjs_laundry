// src/konsumen/dto/update-konsuman.dto.ts
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateKonsumanDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  nama?: string;
}
