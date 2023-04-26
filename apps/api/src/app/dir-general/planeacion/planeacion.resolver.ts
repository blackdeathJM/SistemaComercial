import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PlaneacionDto } from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import { PlaneacionService } from '#api/apps/api/src/app/dir-general/planeacion/planeacion.service';
import { FilCentroGestorMirDto, MirCuestionarioDto, RegMirDto } from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import { EmpleadoDto } from '#api/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.dto';
import { EmpleadoService } from '#api/apps/api/src/app/dir-admon-finanzas/recursos-humanos/empleado/empleado.service';

@Resolver(() => PlaneacionDto)
export class PlaneacionResolver
{
    constructor(private planeacionService: PlaneacionService, private empleadoService: EmpleadoService)
    {
    }

    @Query(() => [PlaneacionDto])
    async filTodos(): Promise<PlaneacionDto[]>
    {
        return await this.planeacionService.filTodos();
    }

    @Query(() => PlaneacionDto)
    async filCentroGestorMir(@Args() args: FilCentroGestorMirDto): Promise<PlaneacionDto>
    {
        return await this.planeacionService.filCentroGestorMir(args);
    }

    @ResolveField('empleadoMir', () => EmpleadoDto)
    async empleadoMir(@Parent() parent: MirCuestionarioDto): Promise<EmpleadoDto>
    {
        return await this.empleadoService.buscarEmpleadoPorId(parent.idEmpleado);
    }

    @Mutation(() => PlaneacionDto)
    async inicializarPlaneacion(@Args('input') input: PlaneacionDto): Promise<PlaneacionDto>
    {
        return await this.planeacionService.inicializarPlaneacion(input);
    }

    @Mutation(() => PlaneacionDto)
    async regMir(@Args('datos') datos: RegMirDto): Promise<PlaneacionDto>
    {
        return await this.planeacionService.regMir(datos);
    }
}
