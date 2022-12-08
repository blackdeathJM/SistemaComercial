import {NgModule, Optional, SkipSelf} from '@angular/core';

import {IconsModule} from '#/apps/sistema-comercial/src/app/core/icons/icons.module';
import {TranslocoCoreModule} from '#/apps/sistema-comercial/src/app/core/transloco/transloco.module';
import {AuthModule} from '@s-core/auth/auth.module';

@NgModule({
    imports: [
        AuthModule,
        IconsModule,
        TranslocoCoreModule
    ]
})
export class CoreModule
{
    /**
     * Constructor
     */
    constructor(@Optional() @SkipSelf() parentModule?: CoreModule)
    {
        // Do not allow multiple injections
        if (parentModule)
        {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
        }
    }
}
