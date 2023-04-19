import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PlaneacionDto } from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import { PlaneacionService } from '#api/apps/api/src/app/dir-general/planeacion/planeacion.service';

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
    async regPlaneacion(@Args('input') input: PlaneacionDto): Promise<PlaneacionDto>
    {
        return await this.planeacionService.regPlaneacion(input);
    }
}