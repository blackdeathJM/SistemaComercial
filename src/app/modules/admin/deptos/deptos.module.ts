import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeptosComponent} from './deptos.component';
import {ModDeptoComponent} from './mod-depto/mod-depto.component';
import {SharedModule} from '@app/shared/shared.module';


@NgModule({
    declarations:
        [
            DeptosComponent,
            ModDeptoComponent
        ],
    imports:
        [
            CommonModule,
            SharedModule
        ]
})
export class DeptosModule
{
}
