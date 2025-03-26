import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schemas';
import { CameraDocument } from 'src/cameras/schemas/camera.schema';

@Injectable()
export class UsersService {
  // añadimos un constructor
  constructor(
    // definimos un modelo para usuarios mediante inyección de dependencias
    @InjectModel(User.name) private readonly userModel : Model<UserDocument>
  ){}
  
  // las llamadas a mongo son asincrónas y devuelven promesas
  // en este caso recibe el DTO del usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  // en este caso se devuelve una promesa con lista de usuarios
  async findAll(query: any): Promise<User[]> {
    return this.userModel.find(query).exec();
  }

  // en este caso la id es un string para que pueda trabajar con Mongo
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user){
      throw new NotFoundException(`Usuario con ID: ${id} no encontrado`);
    }
    return user;
  }

  
  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ _id: id },
      updateUserDto, {
        // esta opción se incluya para que devuelva el usuario modificado
        new: true 
      });
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete({ _id: id}).exec();
  }

  // método para agregar una cámara a un usuario (dueño)
  async addCamera(id: string, camera: any){
    // recuperamos usuario con su ID
    let user: UserDocument | null = await this.userModel.findById(id);
    if (!user){
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    // agregamos la cámara a la lista de cámara del usuario
    user.cameras.push(camera);
    user.save()
    return user;
  }

  // obtener usuario con sus cámaras 
  async findOneWithCameras(userId: string): Promise<User>{
    const user = await this.userModel.findById(userId).populate('cameras').exec();
    if (!user) {
      throw new NotFoundException(`User with ID: ${userId} not found`)
    }
    return user;
  }
}
