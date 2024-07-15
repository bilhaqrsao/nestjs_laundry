import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user.dto";
import { RegisterDto } from "./dto/register-user.dto";
import { Request, Response } from 'express';
import { JwtAuthGuard } from "./auth.guard";
import { RequestWithUser } from "./request-with-user.interface";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response){
        try {
            const result = await this.authService.login(loginDto);
            return res.status(200).json({
                status: 'OK',
                message: 'Login successful',
                data: result
            });
        } catch (error){
            return res.status(400).json({
                status: 'Error',
                message: error.message
            });
        }
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto, @Res() res: Response){
        try {
            const result = await this.authService.register(registerDto);
            return res.status(200).json({
                status: 'OK',
                message: 'Registration successful',
                data: result
            });
        } catch (error){
            return res.status(400).json({
                status: 'Error',
                message: error.message
            });
        }
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException('Token not found');
        }

        const token = authHeader.split(' ')[1];
        try {
            await this.authService.logout(token);
            return res.status(200).json({
                status: 'OK',
                message: 'Logout successful'
            });
        } catch (error) {
            throw new UnauthorizedException('Logout failed');
        }
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req: RequestWithUser) {
        return req.user; // Now TypeScript knows that req.user exists
    }
}
