import {NgModule} from '@angular/core';
import {DeptosComponent} from './deptos.component';
import {ModDeptoComponent} from './components/mod-depto/mod-depto.component';
import {SharedModule} from '@s-shared/shared.module';
import {DirectivesModule} from '@s-directives/directives.module';
import {NgMaterialModule} from '#/libs/ui/src/lib/ng-material/ng-material.module';
import {ListaDeptosComponent} from '@s-app/modules/admin/deptos/components/lista-deptos/lista-deptos.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {UiModule} from '#/libs/ui/src';
import {PlantillasModule} from "#/libs/ui/src/lib/plantillas/plantillas.module";


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
            SharedModule,
            UiModule,
            DirectivesModule,
            NgxSkeletonLoaderModule,
            NgxTrimDirectiveModule,
            PlantillasModule
        ]
})
export class DeptosModule
{
}
