import {Store, StoreConfig} from '@datorama/akita';
import {ISeleccion} from '#/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.interface';
import {Injectable} from '@angular/core';

// export interface ISeleccionState extends EntityState<ISeleccion, string>, ActiveState
// {
//
// }

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'Selecciones', idKey: '_id'})
export class SeleccionStore extends Store<ISeleccion>
{
    constructor()
    {
        super({});
    }
}
