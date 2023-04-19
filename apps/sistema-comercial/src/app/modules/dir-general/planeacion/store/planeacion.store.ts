import {ActiveState, EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {Injectable} from "@angular/core";
import {IPlaneacion} from "#/libs/models/src/lib/dir-general/planeacion/planeacion.interface";

export interface IPlaneacionState extends EntityState<IPlaneacion, string>, ActiveState
{

}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'Planeacion', idKey: '_id'})
export class PlaneacionStore extends EntityStore<IPlaneacionState, IPlaneacion>
{
    constructor()
    {
        super();
    }
}
