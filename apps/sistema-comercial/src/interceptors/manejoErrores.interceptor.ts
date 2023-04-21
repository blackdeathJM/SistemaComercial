import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { NgxToastService } from '@s-services/ngx-toast.service';

@Injectable({ providedIn: 'root' })
export class ManejoErroresInterceptor implements HttpInterceptor
{
    ngxToast = inject(NgxToastService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        console.log('Error en el interceptor', req);
        return next.handle(req).pipe(tap(() => console.log('regresanbd')));
    }
}
