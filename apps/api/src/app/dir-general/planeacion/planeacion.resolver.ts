import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {PlaneacionDto, IniPlaneacionDto} from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
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
    async inicializarPlaneacion(@Args('input') input: IniPlaneacionDto): Promise<PlaneacionDto>
    {
        return await this.planeacionService.inicializarPlaneacion(input);
    }
}
