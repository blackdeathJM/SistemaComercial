import {Module} from '@nestjs/common';
import {PbrService} from '#api/apps/api/src/app/dir-general/planeacion/pbr/pbr.service';
import {MongooseModule} from '@nestjs/mongoose';
import {MirService} from '#api/apps/api/src/app/dir-general/planeacion/mir/mir.service';
import {PbrResolver} from '#api/apps/api/src/app/dir-general/planeacion/pbr/pbr.resolver';
import {MirResolver} from '#api/apps/api/src/app/dir-general/planeacion/mir/mir.resolver';
import {SCHEMA_SELECCION, SeleccionDto} from '#api/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.dto';
import {SeleccionResolver} from '#api/apps/api/src/app/dir-general/planeacion/selecciones/seleccion.resolver';
import {SeleccionService} from '#api/apps/api/src/app/dir-general/planeacion/selecciones/seleccion.service';
import {EmpleadoService} from '#api/apps/api/src/app/dir-admon-finanzas/recursos-humanos/empleado/empleado.service';
import {EmpleadoDto, SCHEMA_EMPLEADO} from '#api/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.dto';
import {PlaneacionDto, SCHEMA_PLANEACION} from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';

@Module({
    imports:
        [
            MongooseModule.forFeature([
                {name: PlaneacionDto.name, schema: SCHEMA_PLANEACION},
                {name: SeleccionDto.name, schema: SCHEMA_SELECCION},
                {name: EmpleadoDto.name, schema: SCHEMA_EMPLEADO}
            ])
        ],
    providers: [PbrService, MirService, PbrResolver, MirResolver, SeleccionService, SeleccionResolver, EmpleadoService]
})
export class PlaneacionModule
{
}
