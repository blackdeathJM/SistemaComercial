import {Injectable} from '@nestjs/common';
import {ExceptionHandler} from '@nestjs/core/errors/exception-handler';

@Injectable()
export class AppService
{
    duplicadoMongo(err: any): void
    {
        if (err.code === 11000)
        {
         throw new ExceptionHandler();
        }
    }
}
