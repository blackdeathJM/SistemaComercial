import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DocumentosResolver implements Resolve<boolean>
{
    constructor()
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    {
        return of(true);
    }
}
