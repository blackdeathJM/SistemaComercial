import {Module} from '@nestjs/common';
import {EmpleadoModule} from '../dir-admon-finanzas/recursos-humanos/empleado/empleado.module';
import {DeptosModule} from '@api-dir-admon-finanzas/deptos.module';

@Module({
    imports:
        [
            DeptosModule,
            EmpleadoModule
        ]
})
export class AdminModule
{
}
