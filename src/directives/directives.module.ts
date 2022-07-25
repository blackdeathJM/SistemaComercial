import {NgModule} from '@angular/core';
import {CapitalizarDirective} from './capitalizar.directive';
import {MayusculasDirective} from './mayusculas.directive';
import { ComponenteDinamicoDirective } from './componente-dinamico.directive';


@NgModule({
    declarations:
        [CapitalizarDirective, MayusculasDirective, ComponenteDinamicoDirective],
    exports:
        [CapitalizarDirective, MayusculasDirective]
})
export class DirectivesModule
{
}
