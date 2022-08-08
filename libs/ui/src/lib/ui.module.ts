import {NgModule} from '@angular/core';
import {NgxToastComponent} from './ngx-toast/ngx-toast.component';
import {PlantillasModule} from './plantillas/plantillas.module';
import {PortalComponent} from './portal/portal.component';
import {RegistrosComponent} from './registros/registros.component';
import {TailwindLoadingComponent} from './tailwind-loading/tailwind-loading.component';
import {NgMaterialModule} from './ng-material/ng-material.module';

@NgModule({
    declarations: [NgxToastComponent, PortalComponent, RegistrosComponent, TailwindLoadingComponent],
    exports: [NgxToastComponent, PortalComponent, RegistrosComponent, TailwindLoadingComponent],
    imports:
        [
            PlantillasModule, NgMaterialModule
        ]
})
export class UiModule
{
}
