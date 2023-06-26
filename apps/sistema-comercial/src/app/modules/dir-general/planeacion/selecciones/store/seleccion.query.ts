import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {SeleccionStore} from '@s-dir-general/selecciones/store/seleccion.store';
import {ISeleccion} from '#/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.interface';

@Injectable({providedIn: 'root'})
export class SeleccionQuery extends Query<ISeleccion>
{
    constructor(protected seleccionStore: SeleccionStore)
    {
        super(seleccionStore);
    }
}
