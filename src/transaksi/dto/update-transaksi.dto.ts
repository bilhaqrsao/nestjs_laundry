// src/transaksi/dto/update-transaksi.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTransaksiDto } from './create-transaksi.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDetailTransaksiDto } from './create-detailtransaksi.dto';

export class UpdateTransaksiDto extends PartialType(CreateTransaksiDto) {
  @IsOptional()
  konsumenId: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateDetailTransaksiDto)
  detailTransaksi: CreateDetailTransaksiDto[];

  @IsOptional()
  status: string;
}
