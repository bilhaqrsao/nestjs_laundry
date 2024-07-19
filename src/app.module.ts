import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { User } from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        url: configService.get<string>('DATABASE_URL'),
        entities: [User],
        synchronize: true,
      }),
      inject: [ConfigService],
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
