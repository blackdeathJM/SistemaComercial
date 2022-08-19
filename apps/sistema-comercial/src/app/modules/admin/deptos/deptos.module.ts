import {NgModule} from '@angular/core';
import {DeptosComponent} from './deptos.component';
import {ModDeptoComponent} from './components/mod-depto/mod-depto.component';
import {SharedModule} from '@s-shared/shared.module';
import {DirectivesModule} from '@s-directives/directives.module';
import {NgMaterialMaterialModule} from '@s-shared/ng-material/ng-material-material.module';
import {ListaDeptosComponent} from '@s-app/modules/admin/deptos/components/lista-deptos/lista-deptos.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {PlantillasModule} from '@s-shared/plantillas/plantillas.module';
import {RouterModule} from "@angular/router";
import {EmpleadoModule} from "@s-app/empleado/empleado.module";


@NgModule({
    declarations:
        [
            DeptosComponent,
            ModDeptoComponent,
            ListaDeptosComponent
        ],
    exports: [
        DeptosComponent
    ],
    imports:
        [
            NgMaterialMaterialModule,
            SharedModule,
            DirectivesModule,
            NgxSkeletonLoaderModule,
            NgxTrimDirectiveModule,
            PlantillasModule,
            RouterModule,
            EmpleadoModule,
        ]
})
export class DeptosModule
{
}
