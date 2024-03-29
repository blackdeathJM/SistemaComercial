import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from '@s-core/auth/store/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private _authService: AuthService)
    {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        // Clone the request object
        const newReq = req.clone();

        // Request
        //
        // If the access token didn't expire, add the Authorization header.
        // We won't add the Authorization header if the access token expired.
        // This will force the server to return a "401 Unauthorized" response
        // for the protected API routes which our response interceptor will
        // catch and delete the access token from the local store while logging
        // the user out from the app.
        // if ( this._authService.accessToken && !AuthUtils.isTokenExpired(this._authService.accessToken) )
        // {
        //     newReq = req.clone({
        //         headers: req.headers.set('Authorization', 'Bearer ' + this._authService.accessToken)
        //     });
        // }

        // Response
        return next.handle(newReq).pipe(
            catchError((error) => {

                // Catch "401 Unauthorized" responses
                if ( error instanceof HttpErrorResponse && error.status === 401 )
                {
                    // Sign out
                    // this._authService.signOut();

                    // Reload the app
                    location.reload();
                }

                return throwError(error);
            })
        );
    }
}
