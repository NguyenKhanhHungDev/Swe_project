import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const port = Number(config.get<string>('PORT') ?? '3001');

  const frontendUrl =
    config.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';

  app.enableCors({
    origin: frontendUrl,
  });

  await app.listen(port);

  console.log(`Backend đang chạy tại http://localhost:${port}`);
}

bootstrap().catch((error: unknown) => {
  console.error('Không khởi động được backend:', error);
  process.exit(1);
});