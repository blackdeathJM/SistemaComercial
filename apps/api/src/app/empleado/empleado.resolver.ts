import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {EmpleadoService} from './empleado.service';
import {EmpleadoDto, IEmpleado} from '@sistema-comercial/models';

@Resolver()
export class EmpleadoResolver
{
    constructor(private empleadoService: EmpleadoService)
    {
    }

    @Query(() => [EmpleadoDto])
    async empleados(): Promise<IEmpleado[]>
    {
        return await this.empleadoService.empleados();
    }

    @Mutation(() => EmpleadoDto)
    async crearEmpleado(@Args('empleadoDatos') empleadoDatos: EmpleadoDto): Promise<IEmpleado>
    {
        return await this.empleadoService.crearEmpleado(empleadoDatos);
    }
}
