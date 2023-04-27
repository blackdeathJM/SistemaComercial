import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {EliminarElementoDto, FilCentroGestorDto, PlaneacionDto} from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {PlaneacionService} from '#api/apps/api/src/app/dir-general/planeacion/planeacion.service';
import {RegMirDto} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {EmpleadoService} from '#api/apps/api/src/app/dir-admon-finanzas/recursos-humanos/empleado/empleado.service';
import {RegPbrDto} from "#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto";

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
    async filCentroGestor(@Args() args: FilCentroGestorDto): Promise<PlaneacionDto>
    {
        return await this.planeacionService.filCentroGestor(args);
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
    async eliminarElemento(@Args() args: EliminarElementoDto): Promise<PlaneacionDto>
    {
        return await this.planeacionService.eliminiarElemento(args);
    }

    @Mutation(() => PlaneacionDto)
    async regPbr(@Args('datos') datos: RegPbrDto): Promise<PlaneacionDto>
    {
        return await this.planeacionService.regPbr(datos);
    }
}
