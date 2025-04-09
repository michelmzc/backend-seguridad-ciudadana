import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/schemas/user.schemas";

export class CreateCameraDto {
    // decorador para definir una propiedad para la documentación en Swagger OpenAPI
    @ApiProperty({
        example: "IR Eyeball Camera"
    })
    readonly name: string; //definición de un campo

    @ApiProperty({ example: "rtsp://example.com"})
    readonly stream_url: string;

    readonly owner: User;
}
