import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {ConfigService} from '@nestjs/config';
import {graphqlUploadExpress} from 'graphql-upload';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
async function bootstrap(): Promise<void>
{
    const app = await NestFactory.create(AppModule);
    // const globalPrefix = 'api';
    app.useGlobalPipes(new ValidationPipe());
    app.use(graphqlUploadExpress());
    app.enableCors();
    // app.setGlobalPrefix('/api');
    const configService = app.get(ConfigService);
    const PORT = configService.get('port') || 3000;
    await app.listen(PORT);
    console.log('url' + await app.getUrl());
    Logger.log(`🚀 Application is running on: http://localhost:${PORT}`);
}

bootstrap().then();
