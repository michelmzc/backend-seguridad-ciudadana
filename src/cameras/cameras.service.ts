import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Camera, CameraDocument } from './schemas/camera.schema';
import { Model } from 'mongoose';

@Injectable()
export class CamerasService {
  // agregamos un constructor
  constructor(
    // definimos un modelo para libros mediante inyección de dependencias
    @InjectModel(Camera.name) private readonly cameraModel:Model<CameraDocument>
  ) {}

  async create(createCameraDto: CreateCameraDto): Promise<Camera> {
    // llamada al método de creación de documentos
    return this.cameraModel.create(createCameraDto);
  }

  async findAll(query: any): Promise<Camera[]> {
    return this.cameraModel.find(query).exec();
  }

  async findOne(id: string): Promise<Camera> {
    const camera = await this.cameraModel.findById(id);
    if(!camera){
      throw new NotFoundException(`Cámara con ID ${id} no encontrada`);
    }
    return camera
  }

  async update(id: string, updateCameraDto: UpdateCameraDto) : Promise<Camera> {
    // llamada al método de actualización de documentos por id pasándole el JSON con las modificaciones
    const camera = await this.cameraModel.findOneAndUpdate({ _id: id }, updateCameraDto, { new: true }); 
    /*
    De forma predeterminada, el método findOneAndUpdate devuelve el objeto original, no el modificado. 
    Para que devuelva el objeto ya modificado hay que pasar al método la opción de {new: true}.
    */
    if(!camera){
      throw new NotFoundException(`Cámara con ID ${id} no encontrada`);  
    }
    return camera
  }

  async remove(id: string) {
    return this.cameraModel.findByIdAndDelete({ _id: id}).exec();
  }

  
}
