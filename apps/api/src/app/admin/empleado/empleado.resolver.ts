import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {EmpleadoService} from './empleado.service';
import {DeptosService} from '../deptos/deptos.service';
import {DeptoDto} from '@sistema-comercial/modelos/depto.dto';
import {IDepto} from '@sistema-comercial/modelos/depto.interface';
import {EmpleadoDto} from '@sistema-comercial/modelos/empleado.dto';
import {IEmpleado} from '@sistema-comercial/modelos/empleado.interface';
import {NotFoundException} from '@nestjs/common';

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

    @ResolveField(() => DeptoDto, {nullable: true})
    async deptoEmpleado(@Parent() parent: EmpleadoDto): Promise<IDepto>
    {
        return this.deptosService.deptoPorId(parent.deptoId);
    }

    @ResolveField(() => EmpleadoDto, {nullable: true})
    async buscarEmpleadoPorId(@Args('_id') _id: string): Promise<IEmpleado | NotFoundException>
    {
        return await this.empleadoService.buscarEmpleadoPorId(_id);
    }
}
