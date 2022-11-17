import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {ConfigService} from '@nestjs/config';
import {graphqlUploadExpress} from 'graphql-upload';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
async function bootstrap(): Promise<void>
{
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}));
    app.use(graphqlUploadExpress());
    app.enableCors();
    app.setGlobalPrefix('/graphql');
    const configService = app.get(ConfigService);
    console.log('puerto', configService.get('PORT'));
    const PORT = process.env.PORT;
    await app.listen(PORT);
    Logger.log(`🚀 Application is running on: http://localhost:${PORT}`);
}

bootstrap().then();
