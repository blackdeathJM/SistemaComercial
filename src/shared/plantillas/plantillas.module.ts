import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TarjetaScrollPagComponent} from './tarjeta-scroll-pag/tarjeta-scroll-pag.component';
import {TarjetaContenidoScrollComponent} from './tarjeta-contenido-scroll/tarjeta-contenido-scroll.component';
import {NgMaterialModule} from '@ng-material/ng-material.module';


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
