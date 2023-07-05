import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {ConfigService} from '@nestjs/config';
import {graphqlUploadExpress} from 'graphql-upload-ts';
import {ExcepcionesMongoose} from '#api/apps/api/src/exceptions/excepciones';
import {VariablesEntorno} from "#api/apps/api/src/config/config";

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
async function bootstrap(): Promise<void>
{
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}));

    // const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExcepcionesMongoose());

    app.use(graphqlUploadExpress());
    app.enableCors();
    app.setGlobalPrefix('/graphql');
    const configService = app.get(ConfigService);
    const PORT = configService.get(VariablesEntorno.puerto);
    await app.listen(PORT);
    Logger.log(`🚀 Application is running on: http://localhost:${PORT}/graphql`);
}

bootstrap().then();
