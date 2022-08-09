import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgMaterialMaterialModule} from '@s-shared/ng-material/ng-material-material.module';
import {TailwindLoadingComponent} from '@s-shared/tailwind-loading/tailwind-loading.component';
import {RegistrosComponent} from '@s-shared/registros/registros.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgMaterialMaterialModule
    ],
    declarations: [
        TailwindLoadingComponent,
        RegistrosComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgMaterialMaterialModule,
        TailwindLoadingComponent,
        RegistrosComponent
    ]
})
export class SharedModule
{
}
