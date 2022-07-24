import {NgModule} from '@angular/core';
import {DeptosComponent} from './deptos.component';
import {ModDeptoComponent} from './mod-depto/mod-depto.component';
import {SharedModule} from '@app/shared/shared.module';
import {DirectivesModule} from '@directives/directives.module';
import {NgMaterialModule} from '@ng-material/ng-material.module';

@NgModule({
    declarations:
        [
            DeptosComponent,
            ModDeptoComponent
        ],
    imports:
        [
            SharedModule,
            DirectivesModule,
            NgMaterialModule,
        ]
})
export class DeptosModule
{
}
