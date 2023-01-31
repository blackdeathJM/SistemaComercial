import {Module} from '@nestjs/common';
import {EmpleadoModule} from '#api/apps/api/src/app/dir-admon-finanzas/recursos-humanos/empleado/empleado.module';
import {DeptosModule} from '@api-dir-admon-finanzas/deptos.module';

@Module({
    imports: [EmpleadoModule, DeptosModule]
})
export class RecursosHumanosModule
{
}
