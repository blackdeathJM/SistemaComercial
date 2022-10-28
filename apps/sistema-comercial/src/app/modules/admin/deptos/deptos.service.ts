import {Injectable} from '@angular/core';
import {DepartamentosGQL} from '#/libs/datos/src';
import {tap} from 'rxjs';
import {STATE_DEPTOS} from '@s-app/deptos/deptos.state';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';

@Injectable({
    providedIn: 'root'
})
export class DeptosService
{
    constructor(private departamentosGQL: DepartamentosGQL)
    {
    }

    obtenerDeptos(): void
    {
        this.departamentosGQL.watch().valueChanges.pipe(tap((res) =>
        {
            if (res.data !== undefined)
            {
                if (res.data.deptos)
                {
                    STATE_DEPTOS(res.data.deptos as IDepto[]);
                }
            }
        })).subscribe();
    }
}
