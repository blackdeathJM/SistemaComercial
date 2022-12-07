import { NgModule } from '@angular/core';
import {FuseScrollResetDirective} from '@s-fuse/scroll-reset/scroll-reset.directive';

@NgModule({
    declarations: [
        FuseScrollResetDirective
    ],
    exports     : [
        FuseScrollResetDirective
    ]
})
export class FuseScrollResetModule
{
}
