import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import {LoginGQL} from '#/libs/datos/src';
import {NgxToastService} from '#/libs/services/src';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TOKEN} from '@s-app/auth/const';
import {STATE_AUTENTICADO, STATE_DATOS_SESION} from '@s-app/auth/auth.state';
import {Router} from '@angular/router';
import {IDatosSesion} from '#/libs/models/src/lib/admin/empleado/auth.interface';

@Injectable({providedIn: 'root'})
export class AuthService
{
    constructor(private _httpClient: HttpClient, private ngxToastService: NgxToastService, private loginGQL: LoginGQL, private jwtHelperService: JwtHelperService,
                private router: Router)
    {
    }

    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }


    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    iniciarSesionConToken(): Observable<any>
    {
        // Renew token

        if (this.jwtHelperService.tokenGetter() && !this.jwtHelperService.isTokenExpired())
        {
            const datosSesion: IDatosSesion = this.jwtHelperService.decodeToken();
            if (datosSesion)
            {
                STATE_DATOS_SESION(datosSesion);
                STATE_AUTENTICADO(true);
                return of(true);
            } else
            {
                this.signOut();
                return of(false);
            }
        }
        return of(false);
    }

    signOut(): void
    {
        // Remove the access token from the local storage
        localStorage.removeItem(TOKEN);
        // Set the authenticated flag to false
        STATE_AUTENTICADO(false);
        this.router.navigate(['/sign-in']).then();
    }


    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }


    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }


    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if (STATE_AUTENTICADO())
        {
            return of(true);
        }

        // Check the access token availability
        if (!this.jwtHelperService.tokenGetter())
        {
            return of(false);
        }

        if (this.jwtHelperService.isTokenExpired())
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it

        return this.iniciarSesionConToken();
    }
}
