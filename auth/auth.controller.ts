import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  create(@Body() dto: RegisterDTO) {
    return this.authService.registerUser(dto);
  }

  @Post("login")
  login(@Body() dto: LoginDTO),

) {
  return this.authService.login(dto);
}
}
