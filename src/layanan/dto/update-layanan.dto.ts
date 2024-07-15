import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateLayananDto {
    @IsOptional()
    @IsString()
    nama?: string;

    @IsOptional()
    @IsInt()
    harga?: number;

    @IsOptional()
    @IsInt()
    durasi?: number;
}