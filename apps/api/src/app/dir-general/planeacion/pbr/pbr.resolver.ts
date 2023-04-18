import {Resolver} from '@nestjs/graphql';
import {PbrDto} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';

@Resolver(() => PbrDto)
export class PbrResolver
{
    // constructor(private pbrService: PbrService, private empleadoService: EmpleadoService)
    // {
    // }
    //
    // @Query(() => [PbrDto], {nullable: true})
    // async pbrs(@Args() args: PbrsDto): Promise<PbrDto[]>
    // {
    //     return this.pbrService.pbrs(args);
    // }
    //
    // @Mutation(() => PbrDto)
    // async regPbr(@Args('input') input: RegPbrDto): Promise<PbrDto>
    // {
    //     return this.pbrService.regPbr(input);
    // }
    //
    // @ResolveField(() => EmpleadoDto)
    // async resPbrEmpleado(@Parent() parent: PbrDto): Promise<EmpleadoDto>
    // {
    //     return this.empleadoService.buscarEmpleadoPorId(parent.idEmpleado);
    // }
}
