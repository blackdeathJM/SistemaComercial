import {Component} from '@angular/core';
import {CdkScrollableModule} from "@angular/cdk/scrolling";

@Component({
    standalone: true,
    imports:
        [
            CdkScrollableModule
        ],
    exportAs: 'app-tarjeta-contenido-scroll',
    selector: 'app-tarjeta-contenido-scroll',
    templateUrl: './tarjeta-contenido-scroll.component.html',
    styleUrls: ['./tarjeta-contenido-scroll.component.scss']
})
export class TarjetaContenidoScrollComponent
{

}
