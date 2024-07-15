import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateLayananDto {
    @IsNotEmpty({ message: 'Nama layanan tidak boleh kosong'})
    @IsString()
    nama: string;

    @IsNotEmpty({ message: 'Harga layanan tidak boleh kosong'})
    @IsInt()
    harga: number;

    @IsNotEmpty({ message: 'Durasi layanan tidak boleh kosong'})
    @IsInt()
    durasi: number;
}
