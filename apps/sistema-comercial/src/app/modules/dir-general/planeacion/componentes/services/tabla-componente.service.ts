import {Injectable} from "@angular/core";
import {IGenerarColumnTabla} from "#/libs/models/src/lib/tabla.interface";
import {IMirCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface";

@Injectable({providedIn: 'root'})
export class TablaComponenteService
{
    static genColFormComun(etiqueta: string[], def: string[], width: string[], tipoDeDato: string[]): IGenerarColumnTabla[]
    {
        const col: IGenerarColumnTabla[] = [];
        etiqueta.forEach((x, i) =>
        {
            col.push({etiqueta: x, def: def[i], llaveDato: def[i], width: width[i], tipoDeDato: tipoDeDato[i]});
        });
        return col;
    }

    static genColFormDinamico(mirActivo: IMirCuestionario, etiquetaTrim: string, defTrim: string): IGenerarColumnTabla[]
    {
        const col: IGenerarColumnTabla[] = [];
        //? Eliminamos los dos primeros elementos del arreglo, que son él, id y el dato, ya que esos están declarados como columnas base en el componentes.component.ts
        const ids = mirActivo.componente.idsColsTabla.slice(2);

        ids.forEach((x) =>
        {
            const idsEnArreglo = x.split('__');
            const etiqueta = idsEnArreglo.shift() + ' ' + etiquetaTrim;
            const def = idsEnArreglo.pop() + defTrim;
            col.push({etiqueta, def, width: '6%'});
        });

        return col;
    }
}
