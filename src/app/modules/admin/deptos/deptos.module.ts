import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeptosComponent} from './deptos.component';
import {ModDeptoComponent} from './mod-depto/mod-depto.component';
import {SharedModule} from '@app/shared/shared.module';
import {MatFormFieldModule} from "@angular/material/form-field";
import {DirectivesModule} from "../../../../directives/directives.module";


@NgModule({
    declarations:
        [
            DeptosComponent,
            ModDeptoComponent
        ],
    imports:
        [
            CommonModule,
            SharedModule,
            MatFormFieldModule,
            DirectivesModule
        ]
})
export class DeptosModule
{
}
