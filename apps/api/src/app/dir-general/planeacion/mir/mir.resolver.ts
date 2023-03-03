import {Resolver, Query, Args, Mutation} from '@nestjs/graphql';
import {MirDto} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {MirService} from '#api/apps/api/src/app/dir-general/planeacion/mir/mir.service';
import {MirsPorCentroGestorDto, MirsPorAnoDto, MirsActAvancesDto} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir-consultas.dto';

@Resolver(() => MirDto)
export class MirResolver
{
    constructor(private mirService: MirService)
    {
    }

    @Query(() => [MirDto], {nullable: true})
    async mirsPorCentroGestor(@Args() args: MirsPorCentroGestorDto): Promise<MirDto[]>
    {
        return await this.mirService.mirsPorCentroGestor(args);
    }

    @Query(() => [MirDto], {nullable: true})
    async mirsPorAno(@Args() args: MirsPorAnoDto): Promise<MirDto[]>
    {
        return await this.mirService.mirsPorAno(args);
    }

    @Mutation(() => MirDto)
    async agregarMir(@Args('input') input: MirDto): Promise<MirDto>
    {
        return await this.mirService.agregarMir(input);
    }

    @Mutation(() => MirDto)
    async mirsActAvances(@Args('input') input: MirsActAvancesDto): Promise<MirDto>
    {
        return await this.mirService.mirsActAvances(input);
    }
}
