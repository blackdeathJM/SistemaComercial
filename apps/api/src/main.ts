import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
// import {ConfigService} from '@nestjs/config';
import {graphqlUploadExpress} from 'graphql-upload';
import {environment} from '@api-environments:/environment';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
async function bootstrap(): Promise<void>
{
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.use(graphqlUploadExpress());
    app.enableCors();
    app.setGlobalPrefix('/graphql');
    // const configService = app.get(ConfigService);
    // const PORT = configService.get('port') || 3000;
    const PORT = environment.port;
    await app.listen(PORT);
    Logger.log(`🚀 Application is running on: http://localhost:${PORT}`);
}

bootstrap().then();
