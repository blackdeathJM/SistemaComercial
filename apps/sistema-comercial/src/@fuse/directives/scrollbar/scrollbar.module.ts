import { NgModule } from '@angular/core';
import {FuseScrollbarDirective} from '@s-fuse/scrollbar/scrollbar.directive';

@NgModule({
    declarations: [
        FuseScrollbarDirective
    ],
    exports     : [
        FuseScrollbarDirective
    ]
})
export class FuseScrollbarModule
{
}
