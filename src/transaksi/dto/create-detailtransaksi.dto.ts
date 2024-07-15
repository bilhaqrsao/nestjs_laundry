import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateDetailTransaksiDto {
  @IsNotEmpty({ message: 'Id layanan tidak boleh kosong' })
  @IsInt({ message: 'Id layanan harus berupa angka bulat' })
  layananId: number;

  @IsNotEmpty({ message: 'Berat tidak boleh kosong' })
  @IsInt({ message: 'Berat harus berupa angka bulat' })
  berat: number;

  @IsOptional()
  @IsInt({ message: 'Harga harus berupa angka bulat' })
  id: number;

  @IsOptional()
  delete?: boolean;
}
