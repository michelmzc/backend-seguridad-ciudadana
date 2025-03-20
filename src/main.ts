import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // configurar títulos de documentación
  const options = new DocumentBuilder()
                  .setTitle("Seguridad Ciudadana API")
                  .setDescription("API REST para sistema de seguridad ciudadana")
                  .setVersion("1.0")
                  .build();
  const document = SwaggerModule.createDocument(app, options);

  // Ruta en la cual se sirve la documentación
  SwaggerModule.setup("docs", app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();