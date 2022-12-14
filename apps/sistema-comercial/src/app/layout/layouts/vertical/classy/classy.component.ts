import {AfterContentChecked, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject, takeUntil} from 'rxjs';
import {IDatosSesion} from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';
import {NavigationService} from '@s-core/navigation/navigation.service';
import {FuseNavigationService, FuseVerticalNavigationComponent} from '@s-fuse/navigation';
import {FuseMediaWatcherService} from '@s-fuse/media-watcher';
import {Navegation} from '@s-core/navigation/navigation.types';
import {Select} from '@ngxs/store';
import {StateAuth} from '@s-core/auth/auth.store';
import {ILoginRespuesta} from "#/libs/models/src/lib/admin/empleado/auth/login.dto";

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ClassyLayoutComponent implements OnInit, OnDestroy
{
    @Select(StateAuth.sesionActual)
    usuario$: Observable<IDatosSesion>;
    isScreenSmall: boolean;
    navigation: Navegation;
    imgPorDefecto = 'assets/images/avatars/avatarDefault.jpg';
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _navigationService: NavigationService,
                private _fuseMediaWatcherService: FuseMediaWatcherService, private _fuseNavigationService: FuseNavigationService)
    {
    }

    get currentYear(): number
    {
        return new Date().getFullYear();
    }

    ngOnInit(): void
    {
        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navegation) =>
            {
                console.log('navegacion', navigation);
                this.navigation = navigation;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) =>
            {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if (navigation)
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
