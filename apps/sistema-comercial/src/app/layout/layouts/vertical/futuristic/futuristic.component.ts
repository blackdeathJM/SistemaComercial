import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject, takeUntil} from 'rxjs';
import {IDatosSesion} from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';
import {NavigationService} from '@s-core/navigation/navigation.service';
import {FuseMediaWatcherService} from '@s-fuse/media-watcher';
import {FuseNavigationService, FuseVerticalNavigationComponent} from '@s-fuse/navigation';
import {Navegation} from '@s-core/navigation/navigation.types';
import {StateAuth} from '@s-core/auth/store/auth.store';

@Component({
    selector: 'futuristic-layout',
    templateUrl: './futuristic.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FuturisticLayoutComponent implements OnInit, OnDestroy
{
    usuario$: Observable<IDatosSesion>;
    isScreenSmall: boolean;
    navigation: Navegation;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _navigationService: NavigationService, public stateAuth: StateAuth,
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

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
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
