import { ModuleWithProviders, NgModule } from '@angular/core';
import {FuseConfigService} from '@s-fuse/config/config.service';
import {FUSE_APP_CONFIG} from '@s-fuse/config/config.constants';

@NgModule()
export class FuseConfigModule
{

    constructor(private _fuseConfigService: FuseConfigService)
    {
    }
    static forRoot(config: any): ModuleWithProviders<FuseConfigModule>
    {
        return {
            ngModule : FuseConfigModule,
            providers: [
                {
                    provide : FUSE_APP_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
