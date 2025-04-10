import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from "./users/users.module";
import { CamerasModule } from './cameras/cameras.module';
import { AuthModule } from './auth/auth.module';
 

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL || 'mongodb://localhost:27017/seguridad-ciudadana'),
    AuthModule,
    UsersModule,
    CamerasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
