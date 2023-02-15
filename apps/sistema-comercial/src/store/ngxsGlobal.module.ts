import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {environment} from '@s-environments/environment';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {NGXS_DATA_STORAGE_CONTAINER, NGXS_DATA_STORAGE_PLUGIN} from '@angular-ru/ngxs/storage';
import {StateAuth} from '@s-core/auth/store/auth.store';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {EntityMisDocumentosStore} from '@s-general/store/entity-mis-documentos.store';
import {EntityNotificacion} from '@s-layout/notifications/store/notificacion.store';
import {EntityDeptoStore} from '@s-dirAdmonFinanzas/departamento/store/entity-depto.store';
import {StateRoles} from '@s-core/auth/store/roles.store';
import {EntityTelemetria} from '@s-dir-tecnica-operativa/store/telemetria.entity';

@NgModule({
    imports:
        [
            NgxsModule.forRoot(
                [StateAuth, EntityDeptoStore, EntityEmpleadoStore, EntityMisDocumentosStore, EntityNotificacion, StateRoles, EntityTelemetria], {
                    developmentMode: !environment.production
                }),
            NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN, NGXS_DATA_STORAGE_CONTAINER]),
            environment.plugins
        ]
})
export class NgxsGlobalModule
{
}
