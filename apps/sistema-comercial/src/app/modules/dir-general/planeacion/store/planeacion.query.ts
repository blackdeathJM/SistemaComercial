import {Injectable} from "@angular/core";
import {IPlaneacionState, PlaneacionStore} from "@s-dir-general/store/planeacion.store";
import {QueryEntity} from "@datorama/akita";
import {IPlaneacion} from "#/libs/models/src/lib/dir-general/planeacion/planeacion.interface";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class PlaneacionQuery extends QueryEntity<IPlaneacionState, IPlaneacion>
{
    constructor(protected planeacionStore: PlaneacionStore)
    {
        super(planeacionStore);
    }

    // obtenerSeleccionado(_id: string): Observable<IPlaneacion>
    // {
    //     return this.planeacionStore.
    // }
}
