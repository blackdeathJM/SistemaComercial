import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {PlaneacionDto} from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {PlaneacionService} from '#api/apps/api/src/app/dir-general/planeacion/planeacion.service';

@Resolver(() => PlaneacionDto)
export class PlaneacionResolver
{
    constructor(private planeacionService: PlaneacionService)
    {
    }

    @Mutation(() => PlaneacionDto)
    async regPlaneacion(@Args('input') input: PlaneacionDto): Promise<PlaneacionDto>
    {
        return await this.planeacionService.regPlaneacion(input);
    }
}
