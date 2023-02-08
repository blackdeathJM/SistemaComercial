import {Pipe, PipeTransform} from '@angular/core';

@Pipe({standalone: true, name: 'navegacionPermiso'})
export class NavegacionPipe implements PipeTransform
{
    transform(value: string[], valorNavegacion: string): boolean
    {
        return false;
    }
}
