import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/utilities/parse-object-id-pipe';
import { CreateCameraDto } from 'src/cameras/dto/create-camera.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
@ApiTags('Usuario')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() query: any) {
    return await this.usersService.findAll(query);
  }

  @UseGuards(AuthGuard) // protege la ruta y extrae el usuario del token
  @Get('profile')
  getProfile(@Request() req){
    console.log("🔍 Token Recibido en Backend:", req.headers.authorization); // Agrega esto
    console.log("🛡️ Usuario autenticado:", req.user);
    
  // `req.user` contiene el payload decodificado del JWT
    return this.usersService.findOneById(req.user.sub); 
  }

  @Get(':id')
  // incluimos el Pipe que modifica el proceso
  async findOneById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.findOneById(id);
  }
  
  @Get(':phoneNumber')
  async findByPhone(@Param('phoneNumber') phoneNumber: string){
    return this.usersService.findOneByPhoneNumber(phoneNumber);
  }

  @Patch(':id')
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.remove(id);
  }

  // ruta para agregar cámaras al usuario
  @Post(':id/cameras')
  async addCamera(
    @Param('id') id: string, // captura de parámetro y aplicación de pipe que compruena ID
    @Body() camera: CreateCameraDto // pasamos dto de camara en el cuerpo
  ){
    return this.usersService.addCamera(id, camera); // llamamos al servicio que agrega la cámara
  }

  @Get(':id/cameras')
  async getUserWithCameras(@Param('id') userId: string){
    return this.usersService.findOneWithCameras(userId);
  }

}