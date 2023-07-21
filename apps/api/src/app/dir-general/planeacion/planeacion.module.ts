import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {SCHEMA_SELECCION, SeleccionDto} from '#api/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.dto';
import {SeleccionResolver} from '#api/apps/api/src/app/dir-general/planeacion/selecciones/seleccion.resolver';
import {SeleccionService} from '#api/apps/api/src/app/dir-general/planeacion/selecciones/seleccion.service';
import {PlaneacionDto, SCHEMA_PLANEACION} from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {PlaneacionService} from "#api/apps/api/src/app/dir-general/planeacion/planeacion.service";
import {PlaneacionResolver} from "#api/apps/api/src/app/dir-general/planeacion/planeacion.resolver";
import {CalculosPbrService} from "#api/apps/api/src/app/dir-general/planeacion/calculosPbr.service";

@Module({
    imports:
        [
            MongooseModule.forFeature([
                {name: PlaneacionDto.name, schema: SCHEMA_PLANEACION},
                {name: SeleccionDto.name, schema: SCHEMA_SELECCION}
            ])
        ],
    providers: [SeleccionService, SeleccionResolver, PlaneacionService, PlaneacionResolver, CalculosPbrService]
})
export class PlaneacionModule
{
}
