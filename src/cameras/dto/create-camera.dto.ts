import { ApiProperty } from "@nestjs/swagger";


export class CreateCameraDto {
    // decorador para definir una propiedad para la documentación en Swagger OpenAPI
    @ApiProperty({
        example: "IR Eyeball Camera"
    })
    readonly name: string; //definición de un campo

    @ApiProperty({ example: "rtsp://example.com"})
    readonly stream_url: string;

    @ApiProperty({
        example: ['NestJS', 'REST API']
    })
    readonly keywords: string []; // ejemplo con un array
}
