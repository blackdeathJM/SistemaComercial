import {Injectable} from '@angular/core';
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";

@Injectable({
    providedIn: 'root'
})
export class ComponentesService
{
    avanceTrim1: number;
    avanceTrim2: number;
    avanceTrim3: number;
    avanceTrim4: number;

    constructor(private planeacionQuery: PlaneacionQuery)
    {
    }
}
