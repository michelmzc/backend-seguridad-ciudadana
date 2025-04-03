import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from "./constants";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '24hr'  }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy], 
    exports: [AuthService]
})

export class AuthModule {}

