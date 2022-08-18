import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmpleadoComponent} from '@s-app/empleado/empleado.component';
import {PlantillasModule} from '@s-shared/plantillas/plantillas.module';
import {NgMaterialMaterialModule} from '@s-shared/ng-material/ng-material-material.module';
import {SharedModule} from '@s-shared/shared.module';
import {ListaEmpleadosComponent} from './lista/lista-empleados.component';
import {DetalleEmpleadoComponent} from './detalle/detalle-empleado.component';
import {RouterModule} from '@angular/router';
import {EmpleadoRouting} from '@s-app/empleado/empleado.routing';

@NgModule({
    declarations: [EmpleadoComponent, ListaEmpleadosComponent, DetalleEmpleadoComponent],
    exports: [
        EmpleadoComponent
    ],
    imports: [
        CommonModule,
        PlantillasModule,
        NgMaterialMaterialModule,
        SharedModule,
        RouterModule,
        EmpleadoRouting
    ]
})
export class EmpleadoModule
{
}
