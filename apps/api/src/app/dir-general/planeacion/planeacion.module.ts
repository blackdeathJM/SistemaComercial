import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {SCHEMA_SELECCION, SeleccionDto} from '#api/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.dto';
import {SeleccionResolver} from '#api/apps/api/src/app/dir-general/planeacion/selecciones/seleccion.resolver';
import {SeleccionService} from '#api/apps/api/src/app/dir-general/planeacion/selecciones/seleccion.service';
import {EmpleadoService} from '#api/apps/api/src/app/dir-admon-finanzas/recursos-humanos/empleado/empleado.service';
import {EmpleadoDto, SCHEMA_EMPLEADO} from '#api/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.dto';
import {PlaneacionDto, SCHEMA_PLANEACION} from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {PlaneacionService} from "#api/apps/api/src/app/dir-general/planeacion/planeacion.service";
import {PlaneacionResolver} from "#api/apps/api/src/app/dir-general/planeacion/planeacion.resolver";
import {CalculosPbrService} from "#api/apps/api/src/app/dir-general/planeacion/calculosPbr.service";
import {ComponenteService} from "#api/apps/api/src/app/dir-general/planeacion/componente.service";

@Module({
    imports:
        [
            MongooseModule.forFeature([
                {name: PlaneacionDto.name, schema: SCHEMA_PLANEACION},
                {name: SeleccionDto.name, schema: SCHEMA_SELECCION},
                {name: EmpleadoDto.name, schema: SCHEMA_EMPLEADO}
            ])
        ],
    providers: [SeleccionService, SeleccionResolver, EmpleadoService, PlaneacionService, PlaneacionResolver, CalculosPbrService, ComponenteService]
})
export class PlaneacionModule
{
}
