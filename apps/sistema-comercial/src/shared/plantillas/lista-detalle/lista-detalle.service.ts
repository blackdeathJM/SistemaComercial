import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ListaDetalleService
{
    #panel = new BehaviorSubject<boolean>(false);

    get getPanel(): Observable<boolean>
    {
        return this.#panel.asObservable();
    }

    set setPanel(v: boolean)
    {
        this.#panel.next(v);
    }
}
