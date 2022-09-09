import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminRouting} from '@s-app/modules/admin/admin.routing';
import {SharedModule} from '@s-shared/shared.module';
import {DeptosModule} from '@s-app/deptos/deptos.module';
import {NgSwitch} from '@angular/common';
import {EmpleadoModule} from './empleado/empleado.module';
import {PlantillasModule} from '@s-shared/plantillas/plantillas.module';
import {FileUploadModule} from '@iplab/ngx-file-upload';

@NgModule({
    declarations:
        [
            AdminComponent
        ],
    imports:
        [
            AdminRouting,
            SharedModule,
            FileUploadModule,
            NgSwitch,
            PlantillasModule,
            DeptosModule,
            EmpleadoModule
        ],
})
export class AdminModule
{
}
