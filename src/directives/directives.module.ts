import {NgModule} from '@angular/core';
import {CapitalizarDirective} from './capitalizar.directive';
import {MayusculasDirective} from './mayusculas.directive';
import { ComponenteDinamicoDirective } from './componente-dinamico.directive';
import { TrimDirective } from './trim.directive';


@NgModule({
    declarations:
        [CapitalizarDirective, MayusculasDirective, ComponenteDinamicoDirective, TrimDirective],
    exports:
        [CapitalizarDirective, MayusculasDirective, TrimDirective]
})
export class DirectivesModule
{
}
