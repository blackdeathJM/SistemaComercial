import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {SeleccionDto} from '#api/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.dto';
import {SeleccionService} from '#api/apps/api/src/app/dir-general/planeacion/selecciones/seleccion.service';

@Resolver(() => SeleccionDto)
export class SeleccionResolver
{
    constructor(private seleccionService: SeleccionService)
    {
    }

    @Mutation(() => SeleccionDto)
    async regSeleccion(@Args('input', {nullable: true}) input: SeleccionDto): Promise<SeleccionDto>
    {
        return this.seleccionService.regSeleccion(input);
    }

    @Query(() => SeleccionDto, {nullable: true, defaultValue: null})
    async selecciones(): Promise<SeleccionDto>
    {
        return this.seleccionService.selecciones();
    }
}
