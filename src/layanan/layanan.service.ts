import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLayananDto } from './dto/create-layanan.dto';
import { UpdateLayananDto } from './dto/update-layanan.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LayananService {
  constructor(private prisma: PrismaService) {}

  async create(createLayananDto: CreateLayananDto) {
    try {
      const { nama, harga, durasi } = createLayananDto;

      const existName = await this.prisma.layanan.findUnique({
        where: { nama: nama },
      });

      if (existName) {
        throw new BadRequestException('Nama layanan sudah ada');
      }

      const newLayanan = await this.prisma.layanan.create({
        data: {
          nama,
          harga: parseInt(harga.toString(), 10),
          durasi: parseInt(durasi.toString(), 10),
        },
      });

      return { error: false, data: newLayanan };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const layananList = await this.prisma.layanan.findMany();
      return { error: false, data: layananList };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const layanan = await this.prisma.layanan.findUnique({
        where: { id: id },
      });

      return { error: false, data: layanan };
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateLayananDto: Partial<UpdateLayananDto>) {
    try {
      const existingLayanan = await this.prisma.layanan.findUnique({
        where: { id: id },
      });
  
      if (!existingLayanan) {
        throw new BadRequestException('Layanan tidak ditemukan');
      }
  
      const updatedLayanan = await this.prisma.layanan.update({
        where: { id: id },
        data: {
          nama: updateLayananDto.nama !== undefined ? updateLayananDto.nama : existingLayanan.nama,
          harga: updateLayananDto.harga !== undefined ? parseInt(updateLayananDto.harga.toString(), 10) : existingLayanan.harga,
          durasi: updateLayananDto.durasi !== undefined ? parseInt(updateLayananDto.durasi.toString(), 10) : existingLayanan.durasi,
        },
      });
  
      return { error: false, data: updatedLayanan };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.layanan.delete({
        where: { id: id },
      });
      
      return { error: false, data: `Layanan dengan ID ${id} berhasil dihapus` };
    } catch (error) {
      throw error;
    }
  }
}
