import {NgModule} from '@angular/core';
import {DeptosComponent} from './deptos.component';
import {ModDeptoComponent} from './components/mod-depto/mod-depto.component';
import {SharedModule} from '@s-shared/shared.module';
import {DirectivesModule} from '@s-directives/directives.module';
import {NgMaterialModule} from '@s-ng-material/ng-material.module';
import {PlantillasModule} from '@s-shared/plantillas/plantillas.module';
import {ListaDeptosComponent} from '@s-app/modules/admin/deptos/components/lista-deptos/lista-deptos.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';



@NgModule({
    declarations:
        [
            DeptosComponent,
            ModDeptoComponent,
            ListaDeptosComponent
        ],
    imports:
        [
            NgMaterialModule,
            PlantillasModule,
            SharedModule,
            DirectivesModule,
            NgxSkeletonLoaderModule,
            NgxTrimDirectiveModule
        ]
})
export class DeptosModule
{
}