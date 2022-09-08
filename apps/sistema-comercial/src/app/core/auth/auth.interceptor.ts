import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AuthService} from '@s-app/core/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private _authService: AuthService)
    {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        const token = localStorage.getItem('token-sistema-comercial');
        if (req.url.indexOf('/graphql') > -1)
        {
            if (token)
            {
                const clon = req.clone({
                    setHeaders: {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        Authorization: `Bearer ${token}`
                    }
                });
                return next.handle(clon);
            }
        }
        return next.handle(req);
    }
}
