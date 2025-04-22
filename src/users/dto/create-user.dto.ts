import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe' })
    readonly name: string;
  
    @ApiProperty({ example: 'johndoe@gmail.com' })
    readonly email: string;

    @ApiProperty({ example: '+56 9 1234 5678'})
    @IsString()
    @IsNotEmpty()
    readonly phoneNumber: string;

    @ApiProperty({ example: '****'})
    @IsString()
    @IsNotEmpty()
    readonly password: string;
  
    @ApiProperty({ example: 'Chile' })
    readonly country: string;
}