import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GralService
{

    constructor()
    {
    }

    static nvoEdo(_id: string, estado: any): any
    {
        return estado.filter((id: { _id: string }) => id._id !== _id);
    }
}
