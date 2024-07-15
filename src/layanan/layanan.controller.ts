import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LayananService } from './layanan.service';
import { CreateLayananDto } from './dto/create-layanan.dto';
import { UpdateLayananDto } from './dto/update-layanan.dto';
import { Roles } from 'src/role/role.decorator';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { RoleGuard } from 'src/role/role.guard';

@Controller('layanan')
export class LayananController {
  constructor(private readonly layananService: LayananService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('Super Admin', 'Developer', 'Admin', 'User')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createLayananDto: CreateLayananDto) {
    return this.layananService.create(createLayananDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('Super Admin', 'Developer', 'Admin', 'User')
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll() {
    return this.layananService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('Super Admin', 'Developer', 'Admin', 'User')
  @UsePipes(new ValidationPipe({ transform: true }))
  findOne(@Param('id') id: string) {
    return this.layananService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('Super Admin', 'Developer', 'Admin', 'User')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: string, @Body() updateLayananDto: UpdateLayananDto) {
    return this.layananService.update(+id, updateLayananDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('Super Admin', 'Developer', 'Admin', 'User')
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Param('id') id: string) {
    return this.layananService.remove(+id);
  }
}
