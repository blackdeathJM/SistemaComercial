import {Injectable} from '@angular/core';
import {DateTime} from 'luxon';
import {v4 as uuidv4} from 'uuid';

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
    private static ano = new Date().getFullYear();
    private static mes = new Date().toLocaleString('es-mx', {month: 'long'});

    static convertirUnix(fecha: IObjFecha): number
    {
        // return moment(fechaHora).unix();
        // var currentTimeInSeconds=Math.floor(Date.now()/1000); //unix timestamp in seconds
        // var currentTimeInMilliseconds=Date.now(); // unix timestamp in milliseconds

        // const current = new Date();
        // current.setHours(new Date().getHours());
        // current.setMinutes(new Date().getMinutes());
        // current.setFullYear(fecha.year, fecha.month, fecha.date);
        // const timestamp = current.getTime();
        // const timestampSeg = DateTime.fromMillis(timestamp, {zone: 'America/Mexico_City'}).toUnixInteger();

        return DateTime.fromObject({year: fecha.year, month: fecha.month + 1, day: fecha.date, hour: new Date().getHours(), minute: new Date().getMinutes()}).toUnixInteger();
    }

    static fechaHoraActual(): number
    {
        // console.log(DateTime.local({zone: 'America/Mexico_City'}).toUnixInteger());
        // console.log(DateTime.utc({locale: 'es-MX'}).toUnixInteger())
        return DateTime.utc({locale: 'es-MX'}).toUnixInteger();
    }

    static nombreArchivo(nombreActual: string): string
    {
        return this.ano + '-' + uuidv4() + '.' + nombreActual.split('.').pop();
    }

    static rutaGuardar(tipoDoc: string, nombreArchivo: string, carpeta: string): string
    {
        if (carpeta === 'perfil')
        {
            return `SIMAPAS/perfil/${this.nombreArchivo(nombreArchivo)}`;
        } else
        {
            return `SIMAPAS/${carpeta}/${tipoDoc}/${this.ano}/${this.mes}/${this.nombreArchivo(nombreArchivo)}`;
        }
    }
}
