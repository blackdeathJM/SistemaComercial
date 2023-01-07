import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {environment} from '@s-environments/environment';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {NGXS_DATA_STORAGE_CONTAINER, NGXS_DATA_STORAGE_PLUGIN} from '@angular-ru/ngxs/storage';
import {StateAuth} from '@s-core/auth/store/auth.store';
import {EntityDeptoStore} from '@s-admin/store/entity-depto.store';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/entity-empleado.store';
import {EntityMisDocumentosStore} from '@s-general/entity-mis-documentos.store';

@NgModule({
    imports:
        [
            NgxsModule.forRoot(
                [StateAuth, EntityDeptoStore, EntityEmpleadoStore, EntityMisDocumentosStore], {
                    developmentMode: !environment.production
                }),
            NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN, NGXS_DATA_STORAGE_CONTAINER]),
            environment.plugins
        ]
})
export class NgxsGlobalModule
{
}
