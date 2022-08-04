import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FuseHighlightComponent} from '@s-fuse/highlight/highlight.component';


@NgModule({
    declarations: [
        FuseHighlightComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        FuseHighlightComponent
    ]
})
export class FuseHighlightModule
{
}
