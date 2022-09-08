import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmpleadoComponent} from '@s-app/empleado/empleado.component';
import {NgMaterialMaterialModule} from '@s-shared/ng-material/ng-material-material.module';
import {SharedModule} from '@s-shared/shared.module';
import {DetalleEmpleadoComponent} from './components/detalle-empleado/detalle-empleado.component';
import {RouterModule} from '@angular/router';
import {EmpleadoRouting} from '@s-app/empleado/empleado.routing';
import {FuseNavigationModule} from '@s-fuse/navigation';
import {RegistroSesionComponent} from './components/registro-sesion/registro-sesion.component';
import {CambioIconoRolPipe} from './pipes/cambio-icono-rol.pipe';
import {EmpleadoGuardModule} from './guards/empleado-guard.module';
import {PerfilModule} from './perfil/perfil.module';

@NgModule({
    declarations:
        [
            EmpleadoComponent,
            DetalleEmpleadoComponent,
            RegistroSesionComponent,
            CambioIconoRolPipe,
        ],
    exports:
        [
            EmpleadoComponent,
        ],
    imports:
        [
            RouterModule,
            CommonModule,
            NgMaterialMaterialModule,
            SharedModule,
            EmpleadoRouting,
            FuseNavigationModule,
            EmpleadoGuardModule,
            PerfilModule,
        ],
})
export class EmpleadoModule
{
}
