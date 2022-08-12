import {Module} from '@nestjs/common';
import {EmpleadoService} from './empleado.service';
import {EmpleadoResolver} from './empleado.resolver';

@Module({
    providers: [EmpleadoService, EmpleadoResolver]
})
export class EmpleadoModule
{
}
