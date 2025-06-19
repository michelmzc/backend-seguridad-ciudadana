import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    readonly name: string;
  
    @ApiProperty({ example: 'johndoe@gmail.com' })
    @IsString()
    @IsNotEmpty()
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

    @ApiProperty({ example: { type: "Point", lat: -40.5749, lng: -73.1330 }})
    readonly location?: {
        type: string,
        coordinates: number[]
    }
}