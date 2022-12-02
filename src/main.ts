import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { urlencoded, json } from 'express';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  app.useStaticAssets(join(__dirname, '..', 'upload'), {
    prefix: '/upload/',
  });
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
 
  app.enableCors({
    allowedHeaders:"*",
    origin: "*"
  });
  await app.listen(5000);
}
bootstrap();
