import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgMaterialMaterialModule} from '@s-shared/ng-material/ng-material-material.module';
import {TarjetaContenidoScrollComponent} from '@s-shared/plantillas/tarjeta-contenido-scroll/tarjeta-contenido-scroll.component';
import {TarjetaScrollPagComponent} from '@s-shared/plantillas/tarjeta-scroll-pag/tarjeta-scroll-pag.component';


@NgModule({
    declarations:
        [
            TarjetaScrollPagComponent,
            TarjetaContenidoScrollComponent
        ],
    exports: [
        TarjetaContenidoScrollComponent
    ],
    imports:
        [
            CommonModule,
            NgMaterialMaterialModule
        ]
})
export class PlantillasModule
{
}
