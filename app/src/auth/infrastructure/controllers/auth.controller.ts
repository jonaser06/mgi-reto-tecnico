import { Controller, Post, Body, UseGuards, Get, Res, HttpStatus } from '@nestjs/common';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { LoginUserDto } from 'src/auth/application/dtos/login-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'The user has been created.' })
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response
  ): Promise<any> {
    const result = await this.registerUseCase.execute(createUserDto);
    res.status(HttpStatus.CREATED)
    res.send({
      status:'success',
      message: 'User has been created successfully',
      details: result,
    });
  }

  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'The user has been logged in.' })
  @Post('login')
  async login(
    @Body() loginDto: LoginUserDto,
    @Res() res: Response
  ) {
    const result = await this.loginUseCase.execute(loginDto.username, loginDto.password);
    res.status(HttpStatus.OK)
    res.send({
      status:'success',
      message: 'User has been logged in successfully',
      data: result,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Return the user profile.' })
  @Get('profile')
  getProfile() {
    return { message: 'This route is protected and requires a valid JWT' };
  }
}
