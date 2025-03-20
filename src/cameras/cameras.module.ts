import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CamerasService } from './cameras.service';
import { CamerasController } from './cameras.controller';
import { Camera, CameraSchema } from './schemas/camera.schema';

@Module({
  // registro del esquema de los libros
  imports: [
    MongooseModule.forFeature([{ name: Camera.name, schema: CameraSchema }])
  ],
  controllers: [CamerasController],
  providers: [CamerasService],
})
export class CamerasModule {}
