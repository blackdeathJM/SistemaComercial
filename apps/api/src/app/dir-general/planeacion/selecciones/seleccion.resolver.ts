import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {AgregarCentroGestorDto, SeleccionDto} from '#api/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.dto';
import {SeleccionService} from '#api/apps/api/src/app/dir-general/planeacion/selecciones/seleccion.service';

@Resolver(() => SeleccionDto)
export class SeleccionResolver
{
    constructor(private seleccionService: SeleccionService)
    {
    }

    @Mutation(() => SeleccionDto)
    async agregarCentroGestor(@Args('input') input: AgregarCentroGestorDto): Promise<SeleccionDto>
    {
        return this.seleccionService.agregarCentroGestor(input);
    }

    @Query(() => [SeleccionDto], {nullable: true, defaultValue: []})
    async centrosGestores(): Promise<SeleccionDto[]>
    {
        return this.seleccionService.centrosGestores();
    }
}
