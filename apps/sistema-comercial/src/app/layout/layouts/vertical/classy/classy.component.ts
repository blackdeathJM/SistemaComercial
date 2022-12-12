import {AfterContentInit, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {IDatosSesion} from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';
import {NavigationService} from '@s-core/navigation/navigation.service';
import {FuseNavigationService, FuseVerticalNavigationComponent} from '@s-fuse/navigation';
import {FuseMediaWatcherService} from '@s-fuse/media-watcher';
import {STATE_DATOS_SESION} from '@s-core/auth/auth.state';
import {Navegation} from '@s-core/navigation/navigation.types';

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ClassyLayoutComponent implements OnInit, OnDestroy, AfterContentInit
{
    isScreenSmall: boolean;
    navigation: Navegation;
    user: IDatosSesion;
    imgPorDefecto = 'assets/images/avatars/avatarDefault.jpg';
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
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

    ngAfterContentInit(): void
    {
        console.log('AfterContentInit');
        this.user = STATE_DATOS_SESION();
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
