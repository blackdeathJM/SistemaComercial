import {Injectable} from '@angular/core';
import {cloneDeep} from 'lodash-es';
import {FuseNavigationItem} from '@s-fuse/navigation';
import {compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation} from '../navigation/data';
import {FuseMockApiService} from '@s-fuse/mock-api';

@Injectable({
    providedIn: 'root'
})
export class NavigationMockApi
{
    private readonly _defaultNavigation: FuseNavigationItem[] = defaultNavigation;
    private readonly _compactNavigation: FuseNavigationItem[] = compactNavigation;
    private readonly _futuristicNavigation: FuseNavigationItem[] = futuristicNavigation;
    private readonly _horizontalNavigation: FuseNavigationItem[] = horizontalNavigation;

    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        this.registerHandlers();
    }

    registerHandlers(): void
    {
        this._fuseMockApiService.onGet('api/common/navigation').reply(() =>
        {
            // Fill compact navigation children using the default navigation
            this._compactNavigation.forEach((compactNavItem) =>
            {
                this._defaultNavigation.forEach((defaultNavItem) =>
                {
                    if (defaultNavItem.id === compactNavItem.id)
                    {
                        compactNavItem.children = cloneDeep(defaultNavItem.children);
                    }
                });
            });

            // Fill futuristic navigation children using the default navigation
            this._futuristicNavigation.forEach((futuristicNavItem) =>
            {
                this._defaultNavigation.forEach((defaultNavItem) =>
                {
                    if (defaultNavItem.id === futuristicNavItem.id)
                    {
                        futuristicNavItem.children = cloneDeep(defaultNavItem.children);
                    }
                });
            });

            // Fill horizontal navigation children using the default navigation
            this._horizontalNavigation.forEach((horizontalNavItem) =>
            {
                this._defaultNavigation.forEach((defaultNavItem) =>
                {
                    if (defaultNavItem.id === horizontalNavItem.id)
                    {
                        horizontalNavItem.children = cloneDeep(defaultNavItem.children);
                    }
                });
            });

            // Return the response
            return [
                200,
                {
                    compact: cloneDeep(this._compactNavigation),
                    default: cloneDeep(this._defaultNavigation),
                    futuristic: cloneDeep(this._futuristicNavigation),
                    horizontal: cloneDeep(this._horizontalNavigation)
                }
            ];
        });
    }
}
