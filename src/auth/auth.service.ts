import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}
    
    async validateUser(phoneNumber: string, password: string): Promise<any> {
        console.log("Buscando al usuario por el número: ", phoneNumber);
        const user = await this.usersService.findOneByPhoneNumber(phoneNumber);
        console.log("Usuario encontrado: ", user);
        if(user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user.toObject();
            return result
        }else{
            throw new UnauthorizedException('Credenciales incorrectas');
        }
    }

    async login(user: any){
        const payload = { phoneNumber: user.phoneNumber, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async register(createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto);
    }
}