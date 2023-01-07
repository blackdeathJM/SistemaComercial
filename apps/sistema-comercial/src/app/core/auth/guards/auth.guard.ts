import {Injectable} from '@angular/core';
import {CanMatch, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import {Observable, of, switchMap} from 'rxjs';
import {StateAuth} from '@s-core/auth/store/auth.store';
import {AuthService} from '@s-core/auth/store/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanMatch
{
    constructor(private router: Router, private stateAuth: StateAuth, private authService: AuthService)
    {
    }

    canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        return this.checar(segments);
    }

    private checar(segments: UrlSegment[]): Observable<boolean | UrlTree>
    {
        return this.authService.validarSesion().pipe(switchMap((autenticado) =>
        {
            // Si no esta autenticado
            if (!autenticado)
            {
                const redirectURL = `/${segments.join('/')}`;
                const urlTree = this.router.parseUrl(`sign-in?redirectURL=${redirectURL}`);
                console.log('El usuario no esta autenticado', urlTree);
                return of(urlTree);
            }

            // Se permite el acceso
            return of(true);
        }));
    }
}
