import { IsNotEmpty, IsInt, IsArray, ValidateNested, IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDetailTransaksiDto } from './create-detailtransaksi.dto';

export class CreateTransaksiDto {
  @IsNotEmpty({ message: 'Id konsumen tidak boleh kosong' })
  @IsInt({ message: 'Id konsumen harus berupa angka bulat' })
  konsumenId: number;

  // @IsNotEmpty({ message: 'Total harus berupa angka bulat' })
  // @IsInt({ message: 'Total harus berupa angka bulat' })
  // total: number;

  @IsOptional()
  @IsDateString()
  tglAmbil?: Date;

  @IsArray({ message: 'Detail transaksi harus berupa array' })
  @ValidateNested({ each: true })
  @Type(() => CreateDetailTransaksiDto)
  detailTransaksi: CreateDetailTransaksiDto[];
}
