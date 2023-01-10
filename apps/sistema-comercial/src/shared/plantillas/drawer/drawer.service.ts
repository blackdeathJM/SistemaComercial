import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DrawerService
{
    #panelIzq = new BehaviorSubject<boolean>(false);
    #panelDer = new BehaviorSubject<boolean>(false);

    get getPanelIzq(): Observable<boolean>
    {
        return this.#panelIzq.asObservable();
    }

    get getPanelDer(): Observable<boolean>
    {
        return this.#panelDer.asObservable();
    }

    set setPanelIzq(v: boolean)
    {
        this.#panelIzq.next(v);
    }

    set setPanelDer(v: boolean)
    {
        this.#panelDer.next(v);
    }
}
