import fastifyCsrf from "@fastify/csrf-protection";
import helmet from "@fastify/helmet";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { AppModule } from "./modules/app.module";
import { configureSwagger } from "./swagger/swagger-config";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.setGlobalPrefix("api");
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  await app.register(fastifyCsrf);
  await app.register(helmet, { contentSecurityPolicy: false });

  configureSwagger(app);

  await app.listen(process.env.API_PORT, process.env.API_ADDRESS);
}

bootstrap().then(() =>
  console.log(
    `Server is running on port ${process.env.API_PORT} with address ${process.env.API_ADDRESS}`
  )
);
