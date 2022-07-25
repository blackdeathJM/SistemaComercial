import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrosComponent} from '@shared/registros/registros.component';
import {NgMaterialModule} from '@ng-material/ng-material.module';
import { PortalComponent } from './portal/portal.component';

@NgModule({
    imports:
        [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NgMaterialModule,
        ],
    exports:
        [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RegistrosComponent
        ],
    declarations:
        [
            RegistrosComponent,
            PortalComponent
        ]
})
export class SharedModule
{
}
