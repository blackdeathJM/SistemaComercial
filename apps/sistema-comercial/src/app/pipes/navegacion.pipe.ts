import {Pipe, PipeTransform} from '@angular/core';
import {AuthQuery} from '@s-core/auth/store/auth.query';


@Pipe({standalone: true, name: 'navegacionPermiso'})
export class NavegacionPipe implements PipeTransform
{
    constructor(private authQuery: AuthQuery)
    {
    }

    transform(id: string, tipo: string): boolean
    {
        if (this.authQuery.getValue().auth.usuario === 'administrador')
        {
            return false;
        }
        return !this.authQuery.getValue().auth[tipo].includes(id);
    }
}
