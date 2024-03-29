import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'obtenerIdForm',
    standalone: true,
})
export class ObtenerIdFormPipe implements PipeTransform
{
    transform(dato: string, pref: string): string
    {
        return pref + dato.split('__').pop();
    }
}
