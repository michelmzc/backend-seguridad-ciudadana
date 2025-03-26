import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CamerasService } from './cameras.service';
import { CamerasController } from './cameras.controller';
import { Camera, CameraSchema } from './schemas/camera.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  // registro del esquema de los libros
  imports: [
    MongooseModule.forFeature([{ name: Camera.name, schema: CameraSchema }]),
    UsersModule // importación módulo de usuario
  ],
  controllers: [CamerasController],
  providers: [CamerasService],
})
export class CamerasModule {}
