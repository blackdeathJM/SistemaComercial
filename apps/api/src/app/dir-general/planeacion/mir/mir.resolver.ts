import {Resolver, Query, Args, Mutation} from '@nestjs/graphql';
import {MirDto} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {MirService} from '#api/apps/api/src/app/dir-general/planeacion/mir/mir.service';
import {ObtenerMirsDto, AgregarMirDto} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir-consultas.dto';

@Resolver(() => MirDto)
export class MirResolver
{
    constructor(private mirService: MirService)
    {
    }

    @Query(() => MirDto, {nullable: true})
    async mirs(@Args() args: ObtenerMirsDto): Promise<MirDto>
    {
        return await this.mirService.mirs(args);
    }

    @Mutation(() => MirDto)
    async agregarMir(@Args('input') input: AgregarMirDto): Promise<MirDto>
    {
        return await this.mirService.agregarMir(input);
    }
}
