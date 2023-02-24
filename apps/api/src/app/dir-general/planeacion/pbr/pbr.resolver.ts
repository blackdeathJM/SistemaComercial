import {Resolver, Args, Query} from '@nestjs/graphql';
import {PbrDto} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';
import {PbrService} from '#api/apps/api/src/app/dir-general/planeacion/pbr/pbr.service';
import {PbrPorAno} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr-consultas.dto';

@Resolver(() => PbrDto)
export class PbrResolver
{
    constructor(private pbrService: PbrService)
    {
    }

    @Query(() => [PbrDto], {nullable: true, description: 'Obtener todos los pbr Por ano'})
    async pbrs(@Args() args: PbrPorAno): Promise<PbrDto>
    {
        return this.pbrService.pbrs(args);
    }
}
