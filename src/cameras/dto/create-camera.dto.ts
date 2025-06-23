import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/schemas/user.schemas";

export class CreateCameraDto {
    // decorador para definir una propiedad para la documentación en Swagger OpenAPI
    @ApiProperty({
        example: "IR Eyeball Camera",
        required: false
    })
    readonly name: string; //definición de un campo

    @ApiProperty({ example: "rtsp://example.com", required: false})
    readonly stream_url: string;

    @ApiProperty({ example: false, required: false })
    readonly isPublic: boolean;

    @ApiProperty({
        example: "2025-06-19T17:00:00.000Z",
        required: false,
        description: "Fecha hasta la cual la cámara será pública"
      })
    readonly publicUntil?: Date;
      

    readonly owner: User;
}
