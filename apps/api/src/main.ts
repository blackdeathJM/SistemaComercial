import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { ExcepcionesMongoose } from '#api/apps/api/src/exceptions/claveDuplicada';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
async function bootstrap(): Promise<void>
{
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    const adapterHost = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExcepcionesMongoose(adapterHost));
    app.use(graphqlUploadExpress());
    app.enableCors();
    app.setGlobalPrefix('/graphql');
    const configService = app.get(ConfigService);
    const PORT = configService.get('PORT');
    await app.listen(PORT);
    Logger.log(`🚀 Application is running on: http://localhost:${PORT}/graphql`);
}

bootstrap().then();
