import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PlaneacionDto } from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import { PlaneacionService } from '#api/apps/api/src/app/dir-general/planeacion/planeacion.service';
import { EliminarElementoMirDto, FilCentroGestorMirDto, RegMirDto } from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
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

    @Mutation(() => PlaneacionDto)
    async eliminarElementoMir(@Args() args: EliminarElementoMirDto): Promise<PlaneacionDto>
    {
        return await this.planeacionService.eliminarElementoMir(args);
    }
}
