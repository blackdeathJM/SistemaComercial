import {Module} from '@nestjs/common';
import {DocumentosResolver} from './documentos.resolver';
import {DocumentosService} from './documentos.service';
import {MongooseModule} from '@nestjs/mongoose';
import {DocumentoDto, SCHEMA_DOCUMENTOS} from '#api/libs/models/src/lib/general/documentos/documento.Dto';
import {EmpleadoDto, SCHEMA_EMPLEADO} from '#api/libs/models/src/lib/admin/empleado/empleado.dto';
import {EmpleadoService} from '@api-admin/empleado.service';

@Module({
    imports:
        [
            MongooseModule.forFeature(
                [
                    {name: DocumentoDto.name, schema: SCHEMA_DOCUMENTOS},
                    {name: EmpleadoDto.name, schema: SCHEMA_EMPLEADO}
                ])
        ],
    providers:
        [
            DocumentosResolver, DocumentosService,EmpleadoService
        ],
})
export class DocumentosModule
{
}
