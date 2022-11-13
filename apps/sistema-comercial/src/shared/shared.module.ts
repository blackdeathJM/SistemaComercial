import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgMaterialMaterialModule} from '@s-shared/ng-material/ng-material-material.module';

@NgModule({
    imports:
        [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NgMaterialMaterialModule,
        ],
    exports:
        [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NgMaterialMaterialModule
        ]
})
export class SharedModule
{
}
