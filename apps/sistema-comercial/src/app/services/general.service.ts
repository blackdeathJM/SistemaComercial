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
        console.log('Datos obtenidos por el fomulario');
        return DateTime.fromObject({year: fecha.year, month: fecha.month, day: fecha.date, hour: new Date().getHours(), minute: new Date().getMinutes()}).toUnixInteger();
    }

    static fechaHoraActual(): number
    {
        // console.log(DateTime.local({zone: 'America/Mexico_City'}).toUnixInteger());
        // console.log(DateTime.utc({locale: 'es-MX'}).toUnixInteger())
        return DateTime.utc({locale: 'es-MX'}).toUnixInteger();
    }
}
