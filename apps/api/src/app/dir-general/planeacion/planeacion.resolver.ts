import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PlaneacionDto } from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import { PlaneacionService } from '#api/apps/api/src/app/dir-general/planeacion/planeacion.service';
import { RegMirDto } from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';

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

    @Query(() => PlaneacionDto)
    async filPorAno(@Args('_id') _id: string): Promise<PlaneacionDto>
    {
        return await this.planeacionService.filPorAno(_id);
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
}
