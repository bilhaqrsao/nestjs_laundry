// src/transaksi/transaksi.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { UpdateTransaksiDto } from './dto/update-transaksi.dto';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { RequestWithUser } from 'src/authentication/request-with-user.interface';
import { Roles } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { PrismaService } from 'src/prisma.service';

@Controller('transaksi')
@UseGuards(JwtAuthGuard, RoleGuard)
export class TransaksiController {
  constructor(
    private readonly transaksiService: TransaksiService,
    private prisma: PrismaService,
  ) {}

  @Post()
  @Roles('Super Admin', 'Developer')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createTransaksiDto: CreateTransaksiDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.transaksiService.create(createTransaksiDto, userId);
  }

  @Patch(':id')
  @Roles('Super Admin', 'Developer')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string, @Body() updateTransaksiDto: UpdateTransaksiDto) {
    return this.transaksiService.update(+id, updateTransaksiDto);
  }

  @Patch('status-bayar/:id')
  @Roles('Super Admin', 'Developer', 'Admin')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateStatusBayar(@Param('id') id: string) {
    return this.transaksiService.updateStatusBayar(+id);
  }

  @Patch('status-ambil/:id')
  @Roles('Super Admin', 'Developer', 'Admin')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateStatusAmbil(@Param('id') id: string) {
    return this.transaksiService.updateStatusAmbil(+id);
  }

  @Get()
  async findAll() {
    return this.transaksiService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.transaksiService.findOne(+id);
  }

  @Delete(':id')
  @Roles('Super Admin', 'Developer')
  async remove(@Param('id') id: string) {
    return this.transaksiService.remove(+id);
  }

  @Delete(':transaksiId/detail/:detailTransaksiId')
  @Roles('Super Admin', 'Developer')
  async deleteDetailTransaksi(@Param('detailTransaksiId') detailTransaksiId: number) {
    return this.prisma.detailTransaksi.delete({
      where: { id: detailTransaksiId },
    });
  }

  @Get('/detail/totalRupiah')
  async totalRupiah() {
    return this.transaksiService.totalRupiah();
  }
}
