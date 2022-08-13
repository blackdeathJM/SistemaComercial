import {Query, Resolver} from '@nestjs/graphql';
import {EmpleadoService} from './empleado.service';
import {EmpleadoDto, IEmpleado} from '@sistema-comercial/models';

@Resolver()
export class EmpleadoResolver
{
    constructor(private empleadoService: EmpleadoService)
    {
    }

    @Query(() => [EmpleadoDto])
    empleados(): Promise<IEmpleado[]>
    {
        return this.empleadoService.empleados();
    }
}
