import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {environment} from '@s-environments/environment';
import {DeptoEliminarStore} from '#/apps/sistema-comercial/src/query/deptoEliminar.store';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {NGXS_DATA_STORAGE_CONTAINER, NGXS_DATA_STORAGE_PLUGIN} from '@angular-ru/ngxs/storage';
import {StateAuth} from '@s-core/auth/auth.store';
import {EmpleadosStore} from '@s-dirAdmonFinanzas/empleados/empleados.store';
import {DeptoEntitieState} from '@s-admin/e-depto.store';

@NgModule({
    imports:
        [
            NgxsModule.forRoot(
                [
                    DeptoEliminarStore, DeptoEntitieState, StateAuth, EmpleadosStore
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
