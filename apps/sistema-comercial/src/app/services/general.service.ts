import {Injectable} from '@angular/core';
import moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class GeneralService
{

    constructor()
    {
    }

    static convertirUnix(fecha: any): number
    {
        const fechaHora =
            {
                ...fecha,
                hour: new Date().getHours(),
                minutes: new Date().getMinutes()
            };
        return moment(fechaHora).unix();
    }
}
