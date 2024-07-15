// src/konsumen/konsumen.controller.ts
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
} from '@nestjs/common';
import { KonsumenService } from './konsumen.service';
import { CreateKonsumanDto } from './dto/create-konsuman.dto';
import { UpdateKonsumanDto } from './dto/update-konsuman.dto';
import { Roles } from 'src/role/role.decorator';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { RoleGuard } from 'src/role/role.guard';

@Controller('konsumen')
export class KonsumenController {
  constructor(private readonly konsumenService: KonsumenService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('Super Admin', 'Developer', 'Admin', 'User')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createKonsumanDto: CreateKonsumanDto) {
    return this.konsumenService.create(createKonsumanDto);
  }

  @Get()
  findAll() {
    return this.konsumenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.konsumenService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id') id: string,
    @Body() updateKonsumanDto: UpdateKonsumanDto,
  ) {
    return this.konsumenService.update(+id, updateKonsumanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.konsumenService.remove(+id);
  }
}
