import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body){
        return this.authService.validateUser(body.phoneNumber, body.password)
        .then(user => this.authService.login(user));
    }

    @Post('register')
    async register(createUserDto: CreateUserDto){
        return this.authService.register(createUserDto);
    }
}