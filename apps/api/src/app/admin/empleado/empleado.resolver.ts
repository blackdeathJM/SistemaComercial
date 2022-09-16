import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {EmpleadoService} from './empleado.service';
import {DeptosService} from '../deptos/deptos.service';
import {NotFoundException} from '@nestjs/common';
import { EmpleadoDto } from '#api/libs/models/src/lib/admin/empleado/empleado.dto';
import {IEmpleado} from '#api/libs/models/src/lib/admin/empleado/empleado.interface';
import {DeptoDto} from '#api/libs/models/src/lib/admin/deptos/depto.dto';
import {IDepto} from '#api/libs/models/src/lib/admin/deptos/depto.interface';

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

    @Query(() => [EmpleadoDto])
    async empleadosSesion(): Promise<IEmpleado[]>
    {
        return await this.empleadoService.empleadosSesion();
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

    // @ResolveField(() => EmpleadoDto, {nullable: true})
    // async buscarEmpleadoPorId(@Args('_id') _id: string): Promise<IEmpleado | NotFoundException>
    // {
    //     return await this.empleadoService.buscarEmpleadoPorId(_id);
    // }
}
