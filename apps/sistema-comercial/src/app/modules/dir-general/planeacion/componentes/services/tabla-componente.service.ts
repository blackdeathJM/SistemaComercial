import {Injectable} from "@angular/core";
import {IGenerarColumnTabla} from "#/libs/models/src/lib/tabla.interface";

@Injectable({providedIn: 'root'})
export class TablaComponenteService
{
    static generarColFormComun(etiqueta: string[], def: string[], width: string[], tipoDeDato: string[]): IGenerarColumnTabla[]
    {
        const col: IGenerarColumnTabla[] = [];

        etiqueta.forEach((x, i) =>
        {
            col.push({etiqueta: x, def: def[i], llaveDato: def[i], width: width[i], tipoDeDato: tipoDeDato[i]});
        });
        return col;
    }
}
