import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ActualizarResponsableDto, EliminarElementoDto, PlaneacionDto, ReemplazarCompDto} from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {PlaneacionService} from '#api/apps/api/src/app/dir-general/planeacion/planeacion.service';
import {RegMirDto} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {AsigActividadDto, RecalcularPbrDto, RegAvancesPbrDto, RegPbrDto} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';
import {SumPbrDto} from "#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbrSumatoria.dto";
import {RegComponenteDto} from "#api/libs/models/src/lib/dir-general/planeacion/componentes/componente.dto";

@Resolver(() => PlaneacionDto)
export class PlaneacionResolver
{
    constructor(private planeacionService: PlaneacionService)
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
    async eliminarComponente(@Args() args: EliminarElementoDto): Promise<PlaneacionDto>
    {
        return await this.planeacionService.eliminarComponente(args);
    }

    @Mutation(() => PlaneacionDto)
    async regAvancePbr(@Args('datos') datos: RegAvancesPbrDto): Promise<PlaneacionDto>
    {
        return this.planeacionService.regAvancePbr(datos);
    }

    @Mutation(() => PlaneacionDto)
    async sumatoriaPbr(@Args('datos') datos: SumPbrDto, @Args('actualizar') actualizar: boolean): Promise<PlaneacionDto>
    {
        return await this.planeacionService.sumatoriaPbr(datos, actualizar, null);
    }

    @Mutation(() => PlaneacionDto)
    async recalcularPbr(@Args('args') args: RecalcularPbrDto): Promise<PlaneacionDto>
    {
        return await this.planeacionService.recalcularPbr(args);
    }

    @Mutation(() => PlaneacionDto)
    async regComponente(@Args('datos') datos: RegComponenteDto): Promise<PlaneacionDto>
    {
        return this.planeacionService.regComponente(datos);
    }

    @Mutation(() => PlaneacionDto)
    async reemplazarComp(@Args() args: ReemplazarCompDto): Promise<PlaneacionDto>
    {
        return this.planeacionService.reemplazarComp(args);
    }

    @Mutation(() => PlaneacionDto)
    async asigActividad(@Args('datos') datos: AsigActividadDto): Promise<PlaneacionDto>
    {
        return await this.planeacionService.asigActividad(datos);
    }
}
