import {NgModule} from '@angular/core';
import {NgMaterialMaterialModule} from '@s-shared/ng-material/ng-material-material.module';
import {TarjetaContenidoScrollComponent} from '@s-shared/plantillas/tarjeta-contenido-scroll/tarjeta-contenido-scroll.component';
import {TarjetaScrollPagComponent} from '@s-shared/plantillas/tarjeta-scroll-pag/tarjeta-scroll-pag.component';
import {ListaDetalleComponent} from './lista-detalle/lista-detalle.component';


@NgModule({
    declarations:
        [
            TarjetaScrollPagComponent,
            TarjetaContenidoScrollComponent,
            ListaDetalleComponent
        ],
    exports:
        [
            TarjetaScrollPagComponent,
            TarjetaContenidoScrollComponent,
            ListaDetalleComponent
        ],
    imports:
        [
            NgMaterialMaterialModule,
        ]
})
export class PlantillasModule
{
}
