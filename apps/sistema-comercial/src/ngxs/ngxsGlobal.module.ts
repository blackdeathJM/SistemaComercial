import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {environment} from '@s-environments/environment';
import {DeptoStore} from '@s-admin/depto.store';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {NGXS_DATA_STORAGE_CONTAINER, NGXS_DATA_STORAGE_PLUGIN} from '@angular-ru/ngxs/storage';
import {StateAuth} from '@s-core/auth/auth.store';
import {EmpleadosStore} from '@s-dirAdmonFinanzas/empleados/empleados.store';
import {DeptoEntitieState} from '@s-admin/depto.storeEntity';

@NgModule({
    imports:
        [
            NgxsModule.forRoot(
                [
                    DeptoStore, DeptoEntitieState, StateAuth, EmpleadosStore
                ], {
                    developmentMode: !environment.production
                }),
            NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN, NGXS_DATA_STORAGE_CONTAINER]),
            environment.plugins
        ]
})
export class NgxsGlobalModule
{
}
