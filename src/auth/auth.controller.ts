import { RtGuard } from './../common/guards/rt.guard';
import { Tokens } from './../types/tokens.type';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { AuthDto } from './../dto/auth.dto';

import { AuthService } from './auth.service';
import {
  GetCurrentUserId,
  GetCurrentUser,
  Public,
} from './../common/decorator';

import {
  Body,
  Controller,
  Post,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthDto) {
    return await this.authService.login(dto);
  }

  @Public()
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: CreateUserDto): Promise<Tokens> {
    return await this.authService.register(dto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: number) {
    return await this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUserId() userId: number,
  ) {
    return await this.authService.refreshTokens(userId, refreshToken);
  }
}
