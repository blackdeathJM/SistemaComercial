import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of, switchMap, tap} from 'rxjs';
import {LoginGQL} from '#/libs/datos/src';
import {NgxToastService} from '#/libs/services/src';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService
{
    #token = 'token-sistema-comercial';
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient, private ngxToastService: NgxToastService, private loginGQL: LoginGQL)
    {
    }

    get accessToken(): string
    {
        return localStorage.getItem(this.#token) ?? '';
    }

    set accessToken(token: string)
    {
        console.log('se recibe bien el token', token);
        localStorage.setItem(this.#token, token);
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

        return this.loginGQL.mutate({login: credenciales},).pipe(tap((res) =>
        {
            if (res.data)
            {
                this.accessToken = res.data.login.token;
                this._authenticated = true;
                return of(res);
            }
        }));
    }

    signInUsingToken(): Observable<any>
    {
        // Renew token
        return this._httpClient.post('api/auth/refresh-access-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) =>
            {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                // TODO: Refrescar usuario cuando el token se ha actualizado
                // this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

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
        if (!this.accessToken)
        {
            return of(false);
        }

        // TODO: checar la expiracion del token
        // if (this.jwtHelperService.isTokenExpired(this.accessToken))
        // {
        //     return of(false);
        // }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
