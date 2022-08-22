import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {EmpleadoService} from './empleado.service';
import {DeptoDto, EmpleadoDto, IDepto, IEmpleado} from '@sistema-comercial/models';
import {DeptosService} from '../deptos/deptos.service';

@Resolver(() => EmpleadoDto)
export class EmpleadoResolver
{
    constructor(private empleadoService: EmpleadoService, private deptosService: DeptosService)
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

    @ResolveField(() => DeptoDto)
    async deptoEmpleado(@Parent() parent: EmpleadoDto): Promise<IDepto>
    {
        return this.deptosService.deptoPorId(parent.deptoId);
    }
}
