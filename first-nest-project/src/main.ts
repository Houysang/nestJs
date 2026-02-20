import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // use for start root module(app.module.ts)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
