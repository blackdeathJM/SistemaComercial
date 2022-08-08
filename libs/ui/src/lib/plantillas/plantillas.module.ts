import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgMaterialModule} from 'libs/ui/src/lib/ng-material/ng-material.module';
import {TarjetaContenidoScrollComponent} from 'libs/ui/src/lib/plantillas/tarjeta-contenido-scroll/tarjeta-contenido-scroll.component';
import {TarjetaScrollPagComponent} from 'libs/ui/src/lib/plantillas/tarjeta-scroll-pag/tarjeta-scroll-pag.component';


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
