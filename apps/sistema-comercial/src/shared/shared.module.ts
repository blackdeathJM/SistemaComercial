import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgMaterialMaterialModule} from '@s-shared/ng-material/ng-material-material.module';
import {TailwindLoadingComponent} from '@s-shared/tailwind-loading/tailwind-loading.component';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {PlantillasModule} from '@s-shared/plantillas/plantillas.module';

@NgModule({
    imports:
        [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NgMaterialMaterialModule,
            PlantillasModule
        ],
    declarations:
        [
            TailwindLoadingComponent,
            RegistrosComponent
        ],
    exports:
        [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NgMaterialMaterialModule,
            PlantillasModule,
            TailwindLoadingComponent,
            RegistrosComponent
        ]
})
export class SharedModule
{
}
