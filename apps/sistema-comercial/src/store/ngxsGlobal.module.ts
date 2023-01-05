import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {environment} from '@s-environments/environment';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {NGXS_DATA_STORAGE_CONTAINER, NGXS_DATA_STORAGE_PLUGIN} from '@angular-ru/ngxs/storage';
import {StateAuth} from '@s-core/auth/auth.store';
import {EntityDeptoStore} from '@s-admin/entity-depto.store';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/entity-empleado.store';

@NgModule({
    imports:
        [
            NgxsModule.forRoot(
                [StateAuth, EntityDeptoStore, EntityEmpleadoStore], {
                    developmentMode: !environment.production
                }),
            NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN, NGXS_DATA_STORAGE_CONTAINER]),
            environment.plugins
        ]
})
export class NgxsGlobalModule
{
}
