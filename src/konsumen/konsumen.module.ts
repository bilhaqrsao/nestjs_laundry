import { Module } from '@nestjs/common';
import { KonsumenService } from './konsumen.service';
import { KonsumenController } from './konsumen.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [KonsumenController],
  providers: [KonsumenService, PrismaService],
})
export class KonsumenModule {}
