import {Injectable} from '@nestjs/common';
import {DateTime} from 'luxon';

@Injectable()
export class AppService
{
    static fechaHoraActual(): number
    {
        return DateTime.utc({locale: 'es-MX'}).toUnixInteger();
    }
}
