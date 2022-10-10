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
}
