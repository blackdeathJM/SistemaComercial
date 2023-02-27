import {Module} from '@nestjs/common';
import {PbrService} from '#api/apps/api/src/app/dir-general/planeacion/pbr/pbr.service';
import {MongooseModule} from '@nestjs/mongoose';
import {MirDto, SCHEMA_MIR} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {PbrDto, SCHEMA_PBR} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';
import {MirService} from '#api/apps/api/src/app/dir-general/planeacion/mir/mir.service';
import {PbrResolver} from '#api/apps/api/src/app/dir-general/planeacion/pbr/pbr.resolver';
import {MirResolver} from '#api/apps/api/src/app/dir-general/planeacion/mir/mir.resolver';
import {SCHEMA_SELECCION, SeleccionDto} from '#api/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.dto';

@Module({
    imports:
        [
            MongooseModule.forFeature([
                {name: MirDto.name, schema: SCHEMA_MIR},
                {name: PbrDto.name, schema: SCHEMA_PBR},
                {name: SeleccionDto.name, schema: SCHEMA_SELECCION}
            ])
        ],
    providers: [PbrService, MirService, PbrResolver, MirResolver]
})
export class PlaneacionModule
{
}
