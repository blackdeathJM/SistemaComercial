import {Injectable} from '@angular/core';
import {CanMatch, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import {Observable, of, switchMap} from 'rxjs';
import {AuthService} from '@s-core/auth/store/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanMatch
{
    constructor(private _router: Router, private authService: AuthService)
    {
    }

    canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        return this.checar();
    }

    private checar(): Observable<boolean>
    {
        return this.authService.validarSesion().pipe(switchMap(autenticado => of(!autenticado)));
    }
}
