import {Module} from '@nestjs/common';
import {EmpleadoModule} from './empleado/empleado.module';
import {DeptosModule} from './deptos/deptos.module';

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
