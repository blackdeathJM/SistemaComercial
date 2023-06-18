import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'obtenerIdForm',
    standalone: true,
})
export class ObtenerIdFormPipe implements PipeTransform
{
    transform(dato: string): string
    {
        return dato.split('__').pop();
    }
}
