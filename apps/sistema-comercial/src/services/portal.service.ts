import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ComponentPortal, DomPortal, TemplatePortal} from '@angular/cdk/portal';

export type Portal = TemplatePortal | ComponentPortal<any> | DomPortal;

@Injectable({
    providedIn: 'root'
})
export class PortalService
{
    private portal$ = new Subject<Portal>();

    get gPortal(): Observable<Portal>
    {
        return this.portal$.asObservable();
    }

    set sPortal(portal: Portal)
    {
        this.portal$.next(portal);
    }
}
