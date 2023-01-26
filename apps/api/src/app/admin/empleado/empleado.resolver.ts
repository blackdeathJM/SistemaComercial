import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {EmpleadoService} from './empleado.service';
import {DeptosService} from '@api-dir-admon-finanzas/deptos.service';
import {EmpleadoDto, RegEmpleadoDto} from '#api/libs/models/src/lib/admin/empleado/empleado.dto';
import {IEmpleado} from '#api/libs/models/src/lib/admin/empleado/empleado.interface';
import {DeptoDto} from '#api/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.dto';

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
    async empleadosSesion(): Promise<EmpleadoDto[]>
    {
        return await this.empleadoService.empleadosSesion();
    }

    @Query(() => [EmpleadoDto])
    async filtrarEmpleados(@Args('consulta') consulta: string): Promise<EmpleadoDto[]>
    {
        return await this.empleadoService.filtrarEmpleados(consulta);
    }

    @Mutation(() => EmpleadoDto)
    async crearEmpleado(@Args('empleadoDatos') empleadoDatos: RegEmpleadoDto): Promise<EmpleadoDto>
    {
        return await this.empleadoService.crearEmpleado(empleadoDatos);
    }

    @ResolveField(() => DeptoDto, {nullable: true})
    async deptoEmpleado(@Parent() parent: EmpleadoDto): Promise<DeptoDto>
    {
        return this.deptosService.deptoPorId(parent.deptoId);
    }

    // @ResolveField(() => EmpleadoDto, {nullable: true})
    // async buscarEmpleadoPorId(@Args('_id') _id: string): Promise<IEmpleado | NotFoundException>
    // {
    //     return await this.empleadoService.buscarEmpleadoPorId(_id);
    // }
}
