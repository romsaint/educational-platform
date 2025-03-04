import { NestFactory } from '@nestjs/core';
import { AppModule } from './tasks.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
  await app.listen(process.env.PORT_TASKS ?? 3001);
}
bootstrap();
