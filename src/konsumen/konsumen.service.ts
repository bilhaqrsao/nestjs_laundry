import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateKonsumanDto } from './dto/create-konsuman.dto';
import { UpdateKonsumanDto } from './dto/update-konsuman.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KonsumenService {
  constructor(private prisma: PrismaService) {}

  async create(createKonsumanDto: CreateKonsumanDto) {
    try {
      const { nama } = createKonsumanDto;

      const newKonsumen = await this.prisma.konsumen.create({
        data: {
          nama,
        },
      });

      return newKonsumen;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.konsumen.findMany();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.konsumen.findUnique({
        where: { id: id },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateKonsumanDto: UpdateKonsumanDto) {
    try {
      const existingKonsumen = await this.prisma.konsumen.findUnique({
        where: { id: id },
      });

      if (!existingKonsumen) {
        throw new Error('Konsumen tidak ditemukan');
      }

      const { nama } = updateKonsumanDto;

      const konsumen = await this.prisma.konsumen.update({
        where: { id: id },
        data: {
          nama,
        },
      });

      return konsumen;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.konsumen.delete({
        where: { id: id },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
