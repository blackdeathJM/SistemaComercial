import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgMaterialModule} from '@s-ng-material/ng-material.module';
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
            NgMaterialModule
        ]
})
export class PlantillasModule
{
}
