import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schemas';


@Module({
  imports: [
    // registro del esquema de usuario con Mongoose
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  // para que otros modulos puedan acceder a UserModel
  exports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])]
})
export class UsersModule {}
