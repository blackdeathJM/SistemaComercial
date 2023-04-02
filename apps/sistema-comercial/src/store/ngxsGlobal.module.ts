import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {environment} from '@s-environments/environment';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {NGXS_DATA_STORAGE_CONTAINER, NGXS_DATA_STORAGE_PLUGIN} from '@angular-ru/ngxs/storage';
import {AuthEntity} from '@s-core/auth/store/auth.entity';
import {EmpleadoEntity} from '@s-dirAdmonFinanzas/empleados/store/empleado.entity';
import {EntityMisDocumentosStore} from '@s-general/store/entity-mis-documentos.store';
import {EntityNotificacion} from '@s-layout/notifications/store/notificacion.store';
import {DeptoEntity} from '@s-dirAdmonFinanzas/departamento/store/depto.entity';
import {StateRoles} from '@s-core/auth/store/roles.entity';
import {EntityTelemetria} from '@s-dir-tecnica-operativa/store/telemetria.entity';
import {SeleccionStore} from '@s-dir-general/selecciones/seleccion.store';
import {EntityMir} from '@s-dir-general/mir/store/mir.entity';
import {EntityPbr} from '@s-dir-general/pbr/store/pbr.entity';

@NgModule({
    imports:
        [
            NgxsModule.forRoot(
                [AuthEntity, DeptoEntity, EmpleadoEntity, EntityMisDocumentosStore, EntityNotificacion, StateRoles, EntityTelemetria,
                SeleccionStore, EntityMir, EntityPbr], {
                    developmentMode: !environment.production
                }),
            NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN, NGXS_DATA_STORAGE_CONTAINER]),
            environment.plugins
        ]
})
export class NgxsGlobalModule
{
}
