import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
  await app.listen(process.env.PORT_USERS ?? 3000);
}
bootstrap();
