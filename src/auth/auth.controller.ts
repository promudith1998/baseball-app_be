import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.Password1);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Get('all-auths')
  getAllAuth() {
    return this.authService.getAllAuth();
  }

  @UseGuards(AuthGuard)
  @Get('all-users')
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Post('save-user')
  async saveUser(@Body() body: any): Promise<string> {
    const { createdByUser, newUser, header, line } = body;

    return await this.authService.createOrUpdateUser(
      createdByUser,
      newUser,
      header,
      line,
    );
  }

  @UseGuards(AuthGuard)
  @Post('save-team')
  async saveTeam(@Body() body: any): Promise<string> {
    const { header, line } = body;

    return await this.authService.createOrUpdateTeam(header, line);
  }
}
