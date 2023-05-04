import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ActualizarResponsableDto, EliminarElementoDto, PlaneacionDto} from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {PlaneacionService} from '#api/apps/api/src/app/dir-general/planeacion/planeacion.service';
import {RegMirDto} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {EmpleadoService} from '#api/apps/api/src/app/dir-admon-finanzas/recursos-humanos/empleado/empleado.service';
import {RegAvancesPbrDto, RegPbrDto} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';
import {SumPbrDto} from "#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbrSumatoria.dto";

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
    async regPbr(@Args('datos') datos: RegPbrDto): Promise<PlaneacionDto>
    {
        return await this.planeacionService.regPbr(datos);
    }

    @Mutation(() => PlaneacionDto)
    async actualizarResponsable(@Args() args: ActualizarResponsableDto): Promise<PlaneacionDto>
    {
        return this.planeacionService.actualizarResponsable(args);
    }

    @Mutation(() => PlaneacionDto)
    async eliminarElemento(@Args() args: EliminarElementoDto): Promise<PlaneacionDto>
    {
        return await this.planeacionService.eliminiarElemento(args);
    }

    @Mutation(() => PlaneacionDto)
    async regAvancePbr(@Args('datos') datos: RegAvancesPbrDto): Promise<PlaneacionDto>
    {
        return this.planeacionService.regAvancePbr(datos);
    }

    @Mutation(() => PlaneacionDto)
    async sumatoriaPbr(@Args('datos') datos: SumPbrDto): Promise<PlaneacionDto>
    {
        return await this.planeacionService.sumatoriaPbr(datos);
    }
}
