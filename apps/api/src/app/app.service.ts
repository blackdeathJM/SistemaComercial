import {Injectable} from '@nestjs/common';
import {DateTime} from 'luxon';

@Injectable()
export class AppService
{
    static fechaHoraActual(): number
    {
        return DateTime.utc({locale: 'es-MX'}).toUnixInteger();
    }

    static nvaPropiedad(propiedad: string, value: string): object
    {
        const obj = {};
        Object.defineProperty(obj, value, {
            configurable: true,
            enumerable: true,
            writable: true,
            value
        });
        return obj;
    }

    static nvaPropConGetSet(valor: string): any
    {
        const objecto = {};
        Object.defineProperty(objecto, valor, {
            configurable: true,
            enumerable: true,
            writable: true,
            get(): any
            {
                return this._valor;
            },
            set(v: any)
            {
                this._valor = v;
            }
        });
    }
}
