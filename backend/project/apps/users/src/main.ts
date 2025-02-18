import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import * as cookies from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
  app.use(cookies(process.env.COOKIE_SECRET))

  await app.listen(process.env.PORT_USERS ?? 3000);
}
bootstrap();
