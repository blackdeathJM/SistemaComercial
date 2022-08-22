import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmpleadoComponent} from '@s-app/empleado/empleado.component';
import {PlantillasModule} from '@s-shared/plantillas/plantillas.module';
import {NgMaterialMaterialModule} from '@s-shared/ng-material/ng-material-material.module';
import {SharedModule} from '@s-shared/shared.module';
import {ListaEmpleadosComponent} from './lista-empleado/lista-empleados.component';
import {DetalleEmpleadoComponent} from './detalle-empleado/detalle-empleado.component';
import {RouterModule} from '@angular/router';
import {EmpleadoRouting} from '@s-app/empleado/empleado.routing';
import {FuseNavigationModule} from "@s-fuse/navigation";

@NgModule({
    declarations: [EmpleadoComponent, ListaEmpleadosComponent, DetalleEmpleadoComponent],
    exports: [
        EmpleadoComponent,
        ListaEmpleadosComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        PlantillasModule,
        NgMaterialMaterialModule,
        SharedModule,
        EmpleadoRouting,
        FuseNavigationModule
    ]
})
export class EmpleadoModule
{
}
