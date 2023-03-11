import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function configureSwagger(app: NestFastifyApplication) {
  if (process.env.SWAGGER === "false")
    return console.log("Swagger disabled due to environment variable value");

  const config = new DocumentBuilder()
    .setTitle("tasks-crud API documentation")
    .setVersion("1.0")
    .addTag("tasks")
    .build();

  const swaggerPath = process.env.SWAGGER_PATH ?? "api";

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document);
  console.log(`Swagger is running at /${swaggerPath}`);
}
