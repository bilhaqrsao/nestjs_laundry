import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AuthModule } from './authentication/auth.module';
import { LayananModule } from './layanan/layanan.module';
import { KonsumenModule } from './konsumen/konsumen.module';
import { TransaksiModule } from './transaksi/transaksi.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    RoleModule,
    PermissionModule,
    AuthModule,
    LayananModule,
    KonsumenModule,
    TransaksiModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
