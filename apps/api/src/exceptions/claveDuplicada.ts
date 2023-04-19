import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { MongooseError } from 'mongoose';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';

@Catch(MongooseError)
export class ExcepcionesMongoose extends BaseExceptionFilter
{
    private httpServer: any;

    constructor(adapterHost: HttpAdapterHost)
    {
        super();
        this.httpServer = adapterHost.httpAdapter;
    }

    catch(exception: MongooseError, host: ArgumentsHost): any
    {
        console.error('mostrando la exception', exception);
    }
}
