// src/transaksi/dto/update-detailtransaksi.dto.ts
import { IsInt, IsOptional, IsBoolean } from 'class-validator';

export class UpdateDetailTransaksiDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsBoolean()
  delete?: boolean;
}
