import {NgModule} from '@angular/core';
import {CapitalizarDirective} from './capitalizar.directive';
import {MayusculasDirective} from './mayusculas.directive';


@NgModule({
    declarations:
        [CapitalizarDirective, MayusculasDirective],
    exports:
        [CapitalizarDirective, MayusculasDirective]
})
export class DirectivesModule
{
}
