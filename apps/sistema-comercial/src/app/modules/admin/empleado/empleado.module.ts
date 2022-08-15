import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmpleadoComponent} from '@s-app/empleado/empleado.component';
import {PlantillasModule} from '@s-shared/plantillas/plantillas.module';
import {NgMaterialMaterialModule} from '@s-shared/ng-material/ng-material-material.module';
import {SharedModule} from '@s-shared/shared.module';
import {ListaComponent} from './lista/lista.component';
import {DetalleComponent} from './detalle/detalle.component';
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [EmpleadoComponent, ListaComponent, DetalleComponent],
    exports: [
        EmpleadoComponent
    ],
    imports: [
        CommonModule,
        PlantillasModule,
        NgMaterialMaterialModule,
        SharedModule,
        RouterModule
    ]
})
export class EmpleadoModule
{
}
