import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import { Express } from 'express';
import { AppModule } from './modules/app.module';

export async function createApp(
  expressApp: Express,
): Promise<INestApplication> {

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp));

  return app;

}
