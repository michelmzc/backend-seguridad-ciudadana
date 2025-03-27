import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe' })
    readonly name: string;
  
    @ApiProperty({ example: 'johndoe@gmail.com' })
    readonly email: string;

    @ApiProperty({ example: '+56912345678'})
    readonly phoneNumber: string;

    @ApiProperty({ example: '****'})
    readonly password: string;
  
    @ApiProperty({ example: 'Spain' })
    readonly country: string;
}