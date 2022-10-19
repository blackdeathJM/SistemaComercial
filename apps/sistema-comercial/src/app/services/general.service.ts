import {Injectable} from '@angular/core';
import {DateTime} from 'luxon';

@Injectable({
    providedIn: 'root'
})
export class GeneralService
{
    static convertirUnix(fecha: any): number
    {
        // return moment(fechaHora).unix();
        return DateTime.fromObject({year: fecha.year, month: fecha.month, day: fecha.date, hour: new Date().getHours(), minute: new Date().getMinutes()}).toUnixInteger();
    }

    static fechaHoraActual(): number
    {
        // console.log(DateTime.local({zone: 'America/Mexico_City'}).toUnixInteger());
        // console.log(DateTime.utc({locale: 'es-MX'}).toUnixInteger())
        return DateTime.utc({locale: 'es-MX'}).toUnixInteger();
    }
}
