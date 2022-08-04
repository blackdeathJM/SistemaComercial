import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {NgMaterialModule} from '@s-ng-material/ng-material.module';
import {NgxToastComponent} from '@s-shared/ngx-toast/ngx-toast.component';
import {PortalComponent} from '@s-shared/portal/portal.component';
import {TailwindLoadingComponent} from '@s-shared/tailwind-loading/tailwind-loading.component';


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
