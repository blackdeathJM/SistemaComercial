import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {ConfigService} from '@nestjs/config';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
async function bootstrap(): Promise<void>
{
    const app = await NestFactory.create(AppModule);
    const globalPrefix = 'graphql';
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    app.setGlobalPrefix(globalPrefix);
    const configService = app.get(ConfigService);
    console.log('configService', configService);
    const port = configService.get('port') || 3000;
    await app.listen(port);
    Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    );
}

bootstrap().then();
