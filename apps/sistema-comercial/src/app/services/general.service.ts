import {Injectable} from '@angular/core';
import {DateTime} from 'luxon';

export interface IObjFecha
{
    year: number;
    month: number;
    date: number;
}

@Injectable({
    providedIn: 'root'
})
export class GeneralService
{
    static convertirUnix(fecha: IObjFecha): number
    {
        // return moment(fechaHora).unix();
       // var currentTimeInSeconds=Math.floor(Date.now()/1000); //unix timestamp in seconds
       // var currentTimeInMilliseconds=Date.now(); // unix timestamp in milliseconds
        const current = new Date();
        console.log('current', current);
        current.setHours(new Date().getHours());
        current.setMinutes(new Date().getMinutes());

        current.setMinutes(0);

         current.setFullYear(fecha.year, fecha.month, fecha.date);

        const timestamp = current.getTime();
        console.log('timestamp',timestamp);
        return DateTime.fromObject({year: fecha.year, month: fecha.month, day: fecha.date, hour: new Date().getHours(), minute: new Date().getMinutes()}).toUnixInteger();
    }

    static fechaHoraActual(): number
    {
        // console.log(DateTime.local({zone: 'America/Mexico_City'}).toUnixInteger());
        // console.log(DateTime.utc({locale: 'es-MX'}).toUnixInteger())
        return DateTime.utc({locale: 'es-MX'}).toUnixInteger();
    }
}
