import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schemas';

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
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
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
}
