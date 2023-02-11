import {Pipe, PipeTransform} from '@angular/core';
import {StateAuth} from '@s-core/auth/store/auth.store';

@Pipe({standalone: true, name: 'navegacionPermiso'})
export class NavegacionPipe implements PipeTransform
{
    constructor(private stateAuth: StateAuth)
    {
    }

    transform(id: string, tipo: string): boolean
    {
        if (this.stateAuth.snapshot.auth.usuario === 'administrador')
        {
            return false;
        }
        return !this.stateAuth.snapshot.auth[tipo].includes(id);
    }
}
