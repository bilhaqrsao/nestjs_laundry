// src/authentication/role.guard.ts

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true; // No roles defined, access granted by default
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user.id; // Assuming your JWT strategy sets `user` object with `id`

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        role: true, // Assuming `role` relation exists on `User` model
      },
    });

    if (!user || !user.role || !roles.includes(user.role.name)) {
      throw new UnauthorizedException('Invalid role');
    }

    return true;
  }
}
