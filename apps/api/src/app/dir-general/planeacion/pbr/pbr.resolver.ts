import {Resolver, Args, Query, Mutation, ResolveField, Parent} from '@nestjs/graphql';
import {PbrDto} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';
import {PbrService} from '#api/apps/api/src/app/dir-general/planeacion/pbr/pbr.service';
import {PbrsDto, RegPbrDto} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr-consultas.dto';
import {EmpleadoDto} from '#api/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.dto';
import {EmpleadoService} from '#api/apps/api/src/app/dir-admon-finanzas/recursos-humanos/empleado/empleado.service';

@Resolver(() => PbrDto)
export class PbrResolver
{
    constructor(private pbrService: PbrService, private empleadoService: EmpleadoService)
    {
    }

    @Query(() => [PbrDto], {nullable: true, description: 'Obtener todos los pbr Por ano'})
    async pbrs(@Args() args: PbrsDto): Promise<PbrDto[]>
    {
        return this.pbrService.pbrs(args);
    }

    @Mutation(() => PbrDto)
    async regPbr(@Args('input') input: RegPbrDto): Promise<PbrDto>
    {
        return this.pbrService.regPbr(input);
    }

    @ResolveField(() => EmpleadoDto)
    async resPbrEmpleado(@Parent() parent: PbrDto): Promise<EmpleadoDto>
    {
        return this.empleadoService.buscarEmpleadoPorId(parent.idEmpleado);
    }
}
