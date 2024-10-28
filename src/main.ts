import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [process.env.FRONTEND_SERVICE],
      credentials: true,
    },
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException({
          status: 422,
          message: 'Validation Error',
          error: 'validation_error',
          causes: errors.reduce(
            (acc, e) => ({
              ...acc,
              [e.property]: Object.values(e.constraints),
            }),
            {},
          ),
        });
      },
    }),
  );
  await app.listen(process.env.API_SERVER_PORT);
}
bootstrap();
