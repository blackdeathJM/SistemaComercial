import {Injectable} from "@angular/core";
import {IGenerarColumnTabla} from "#/libs/models/src/lib/tabla.interface";

@Injectable({providedIn: 'root'})
export class TablaComponenteService
{
    static genColFormComun(etiqueta: string[], width: string[], tipoDeDato: string, suf: string): IGenerarColumnTabla[]
    {
        const col: IGenerarColumnTabla[] = [];

        etiqueta.forEach((x, i) =>
        {
            col.push({etiqueta: x + ' ' + suf, def: x + suf, width: width[i], tipoDeDato: tipoDeDato});
        });
        return col;
    }

    static genColFormDinamico(arregloDivider: string[], etiqueta: string, def: string, omitirIndicadorPrincipal = false): IGenerarColumnTabla[]
    {
        const col: IGenerarColumnTabla[] = [];
        //? Eliminamos los dos primeros elementos del arreglo, que son él, id y el dato, ya que esos están declarados como columnas base en el componentes.component.ts
        // const ids = omitirIndicadorPrincipal? arregloDivider.slice(2) : arregloDivider;

        const idsPrimeros = arregloDivider.slice(0, 2);
        const idsOmitirPrimeros = arregloDivider.slice(2);
        // ids.forEach((x) =>
        // {
        //     const idsEnArreglo = x.split('__');
        //     const etiquetaComp = idsEnArreglo.shift() + ' ' + etiqueta;
        //     const defComp = idsEnArreglo.pop() + def;
        //     col.push({etiqueta: etiquetaComp, def: defComp, width: '6%'});
        // });
        return col;
    }
}
