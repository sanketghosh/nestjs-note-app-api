import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  // swagger ui configuration
  const options: SwaggerCustomOptions = {
    ui: true,
  };
  const config = new DocumentBuilder()
    .setTitle("Note App API Documentation")
    .setDescription(
      "Full API documentation for a note taking app's API with CRUD functionalities and authentication, built with NodeJS, TypeScript and NestJS."
    )
    .setVersion("1.0.0")
    .addTag("note")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory, options);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
