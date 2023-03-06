import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ManejoErroresInterceptor implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        console.log('...........', req.url);
        return next.handle(req).pipe(catchError((err) =>
        {
            console.log('Error en el interceptor', err);
            return throwError(err);
        }));
    }
}
