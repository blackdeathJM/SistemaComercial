import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject, tap} from 'rxjs';
import {Navegation} from '@s-core/navigation/navigation.types';

@Injectable({
    providedIn: 'root'
})
export class NavigationService
{
    private _navigation: ReplaySubject<Navegation> = new ReplaySubject<Navegation>(1);

    constructor(private _httpClient: HttpClient)
    {
    }

    get navigation$(): Observable<Navegation>
    {
        return this._navigation.asObservable();
    }

    get(): Observable<Navegation>
    {
        return this._httpClient.get<Navegation>('api/common/navigation').pipe(
            tap((navigation) =>
            {
                this._navigation.next(navigation);
            })
        );
    }
}
