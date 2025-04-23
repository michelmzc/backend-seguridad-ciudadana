import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateReportDto {
    @ApiProperty({ example: 'Se reporta incidente ...'})
    @IsString()
    readonly text: string;

    @ApiProperty({ example: 'Vandalismo'})
    @IsString()
    readonly category: string;

    @ApiProperty({
        example: {lat: -40.57395, lon: -73.13348 },
        description: 'Ubicación del reporte'
    })
    readonly location: { lat: number, lon: number }

    @ApiProperty({
        example: '6626cbbaf4540fadb22df123'
    })
    readonly user: string;
}
