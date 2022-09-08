import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
    name: 'cambioIconoRol'
})
export class CambioIconoRolPipe implements PipeTransform
{
    iconoMostrar =
        {
            ninguno: 'lock',
            lectura: 'heroicons_outline:eye',
            completo: 'lock_open'
        };

    transform(valor: string): string
    {
        return this.iconoMostrar[valor];
    }

}
