import {Pipe, PipeTransform} from '@angular/core';
import {ITabla} from "@s-shared/components/tabla-mat/tabla-interface";

@Pipe({
    name: 'componentes',
    standalone: true
})
export class ComponentesPipe implements PipeTransform
{
    valorTrimestres = 0;

    // transform(datosComponente: IformComun[] | IFormPlanta[], tipoForm: { tipoForm: string, trim: string }): number
    // {
    //     switch (tipoForm.tipoForm)
    //     {
    //         case TiposFormulario.COMUN:
    //
    //             const datos = datosComponente as IformComun[];
    //             this.valorTrimestres = Number((datos[0][tipoForm.trim] / datos[1][tipoForm.trim]).toFixed(2));
    //             break;
    //         case TiposFormulario.PERIODO_ANT:
    //             break;
    //         case TiposFormulario.PTAR:
    //             break;
    //     }
    //     return this.valorTrimestres;
    // }

    transform(datosComponente: any, columnas: ITabla): string
    {
        return '';
    }
}
