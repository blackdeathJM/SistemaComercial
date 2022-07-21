import {NgModule} from '@angular/core';
import {InicioComponent} from './inicio.component';
import {InicioRouting} from '@app/modules/inicio/inicio.routing';

@NgModule({
    declarations:
        [
            InicioComponent
        ],
    imports:
        [
            InicioRouting
        ]
})
export class InicioModule
{
}
