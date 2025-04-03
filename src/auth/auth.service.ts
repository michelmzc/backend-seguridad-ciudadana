import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService
    ) {}
    
    async validateUser(phoneNumber: string, password: string): Promise<any> {
        console.log("Buscando al usuario por el número: ", phoneNumber);
        const user = await this.usersService.findOneByPhoneNumber(phoneNumber);
        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }
        console.log("Usuario encontrado: ", user);

        if(user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user.toObject();
            return result
            
        }else{
            throw new UnauthorizedException('Credenciales incorrectas');
        }
    }

    async login(phoneNumber, password): Promise<{ access_token: string }>{
        const user = await this.validateUser(phoneNumber, password)
        if(!user){
            throw new UnauthorizedException();
        }

        const payload = { sub: user._id, phoneNumber: user.phoneNumber };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }

    async register(createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto);
    }
}