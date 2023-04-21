import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { GraphQLResolveInfo } from 'graphql/type';

@Catch()
export class ExcepcionesMongoose implements GqlExceptionFilter, ExceptionFilter
{
    catch(exception: HttpException, host: ArgumentsHost): any
    {
        const ctx = host.switchToHttp();
        const gqlHost = GqlArgumentsHost.create(host);
        const status = exception.getStatus
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        return exception;
    }
}
