import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrosComponent} from '@shared/registros/registros.component';
import {NgMaterialModule} from '@ng-material/ng-material.module';
import {PortalComponent} from './portal/portal.component';
import {NgxToastComponent} from './ngx-toast/ngx-toast.component';
import { TailwindLoadingComponent } from './tailwind-loading/tailwind-loading.component';

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
            RegistrosComponent,
            NgxToastComponent,
            TailwindLoadingComponent
        ],
    declarations:
        [
            RegistrosComponent,
            PortalComponent,
            NgxToastComponent,
            TailwindLoadingComponent
        ]
})
export class SharedModule
{
}
