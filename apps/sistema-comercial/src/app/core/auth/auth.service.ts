import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import {LoginGQL} from '#/libs/datos/src';
import {NgxToastService} from '#/libs/services/src';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TOKEN} from '@s-app/auth/const';
import {Apollo} from 'apollo-angular';
import {STATE_DATOS_SESION} from '@s-app/auth/auth.state';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;

    constructor(private _httpClient: HttpClient, private ngxToastService: NgxToastService, private loginGQL: LoginGQL, private jwtHelperService: JwtHelperService,
                private apollo: Apollo)
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

    signIn(credenciales: { usuario: string; contrasena: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if (this._authenticated)
        {
            this.ngxToastService.alertaToast('Ya tienes una sesion activa', 'Sesion Activa');
            return;
        }

        return this.loginGQL.mutate({login: credenciales}).pipe(tap((res) =>
        {
            if (res.data)
            {
                localStorage.setItem(TOKEN, res.data.login.token);
                this._authenticated = true;
                return of(res);
            }
        }));
    }

    signInUsingToken(): Observable<any>
    {
        // Renew token

        if (this.jwtHelperService.tokenGetter() && !this.jwtHelperService.isTokenExpired())
        {
            STATE_DATOS_SESION(this.jwtHelperService.decodeToken());
            this._authenticated = true;
            return of(true);
        }
        return of(false);
    }

    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem(TOKEN);
        this.apollo.getClient().resetStore().then();

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
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
        if (this._authenticated)
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

        return this.signInUsingToken();
    }
}
