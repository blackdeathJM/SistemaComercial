import {ArgumentsHost, Catch, ExceptionFilter, ExecutionContext, HttpException, HttpStatus} from '@nestjs/common';
import {MongooseError} from 'mongoose';
import {GraphQLException} from "@nestjs/graphql/dist/exceptions";
import {GqlExecutionContext} from "@nestjs/graphql";

@Catch()
export class ExcepcionesMongoose implements ExceptionFilter
{
    catch(exception: MongooseError, host: ArgumentsHost)
    {
        console.log(exception.message);
        const gqlCtx = GqlExecutionContext.create(<ExecutionContext>host);
        const context = gqlCtx.getContext();
        const info = gqlCtx.getInfo();

        // Manejar excepciones de tipo HttpException
        if (exception instanceof HttpException)
        {
            const response = exception.getResponse();
            const status = exception.getStatus();

            // Enviar una respuesta específica al cliente
            context.res.status(status).json({
                statusCode: status,
                message: response,
                timestamp: new Date().toISOString(),
            });
        }

        // Manejar excepciones de tipo MongooseError
        if (exception instanceof MongooseError)
        {
            // Registrar el error en un archivo de registro o enviar una notificación al equipo de desarrollo
            console.log('Error de Mongoose:', exception.message);
        }

        // Manejar excepciones de tipo GraphQLException
        if (exception instanceof GraphQLException)
        {
            const response = exception.originalError;

            // Enviar una respuesta específica al cliente
            context.res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: response,
                timestamp: new Date().toISOString(),
            });
        }

        // Manejar cualquier otro tipo de excepción
        else
        {
            // Enviar una respuesta genérica al cliente
            context.res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error interno del servidor',
                timestamp: new Date().toISOString(),
            });

            // Registrar el error en un archivo de registro o enviar una notificación al equipo de desarrollo
            console.log('Error interno del servidor:', exception.message);
        }
    }
}
