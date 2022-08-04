import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {merge} from 'lodash-es';
import {FUSE_APP_CONFIG} from '@s-fuse/services/config/config.constants';
import {tema} from '@s-app/config/app.config';


@Injectable({
    providedIn: 'root'
})
export class FuseConfigService
{
    private _config: BehaviorSubject<any>;

    /**
     * Constructor
     */
    constructor(@Inject(FUSE_APP_CONFIG) config: any)
    {
        // Private
        this._config = new BehaviorSubject(config);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    get config$(): Observable<any>
    {
        return this._config.asObservable();
    }

    /**
     * Setter & getter for config
     */
    set config(value: any)
    {
        // Merge the new config over to the current config
        const config = merge({}, this._config.getValue(), value);
        localStorage.setItem(tema, JSON.stringify(config));
        // Execute the observable
        this._config.next(config);
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resets the config to the default
     */
    reset(): void
    {
        // Set the config
        this._config.next(this.config);
    }
}
