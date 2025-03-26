import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Camera, CameraDocument } from './schemas/camera.schema';
import { Model, Types } from 'mongoose'
import { User } from 'src/users/schemas/user.schemas';

@Injectable()
export class CamerasService {
  // agregamos un constructor
  constructor(
    // definimos un modelo para libros mediante inyección de dependencias
    @InjectModel(Camera.name) private readonly cameraModel:Model<CameraDocument>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async create(createCameraDto: CreateCameraDto): Promise<Camera> {
    // llamada al método de creación de documentos
    return this.cameraModel.create(createCameraDto);
  }

  async findAll(query: any): Promise<Camera[]> {
    return this.cameraModel
      .find(query)
      .populate({ path: 'owner.user' })
      .exec();
  }

  async findOne(id: string): Promise<Camera> {
    const camera = await this.cameraModel
      .findById(id)
      .populate({ path: 'owner.user'})
      .exec();

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

  // asignar una cámara a un usuario
  async assignCameraToUser(userId: string, cameraId: string){
    const camera = await this.cameraModel.findById(cameraId);
    if (!camera) throw new NotFoundException(`Camera with ID ${cameraId} not found`);

    camera.owner = new Types.ObjectId(userId);

    await camera.save()

    await this.userModel.findByIdAndUpdate(userId, { $addToSet: { cameras: cameraId }});

    return { message: `Cámera ${cameraId} asigned to ${userId}`};
  }

  async reassignCamera(cameraId: string, newUserId: string) {
    const camera = await this.cameraModel.findById(cameraId);
    if (!camera) throw new NotFoundException(`Cámara con ID ${cameraId} no encontrada`);

    const oldUserId = camera.owner;

    camera.owner = new Types.ObjectId(newUserId);
    await camera.save();

    if (oldUserId) {
      await this.userModel.findByIdAndUpdate(oldUserId, { $pull: { cameras: cameraId } });
    }

    await this.userModel.findByIdAndUpdate(newUserId, { $addToSet: { cameras: cameraId } });

    return { message: `Cámara ${cameraId} reasignada de ${oldUserId} a ${newUserId}` };
  }

}