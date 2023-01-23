import {Module} from '@nestjs/common';
import {DocumentosResolver} from './documentos.resolver';
import {DocumentosService} from './documentos.service';
import {MongooseModule} from '@nestjs/mongoose';
import {DocumentoDto, SCHEMA_DOCUMENTOS} from '#api/libs/models/src/lib/general/documentos/documento.Dto';
import {EmpleadoDto, SCHEMA_EMPLEADO} from '#api/libs/models/src/lib/admin/empleado/empleado.dto';
import {EmpleadoService} from '@api-admin/empleado.service';
import {SubirArchivosService} from '#api/apps/api/src/app/upload/subir-archivos.service';
import {DeptoDto, SCHEMA_DEPTO} from '#api/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.dto';
import {NotificacionService} from '@api-general/notificaciones/notificacion.service';
import {NotificacionDto, SCHEMA_NOTIFICACION} from '#api/libs/models/src/lib/general/notificacion/notificacion.dto';
import {DeptosService} from '@api-dir-admon-finanzas/deptos.service';

@Module({
    imports:
        [
            MongooseModule.forFeature(
                [
                    {name: DocumentoDto.name, schema: SCHEMA_DOCUMENTOS},
                    {name: EmpleadoDto.name, schema: SCHEMA_EMPLEADO},
                    {name: DeptoDto.name, schema: SCHEMA_DEPTO},
                    {name: NotificacionDto.name, schema: SCHEMA_NOTIFICACION}
                ])
        ],
    providers:
        [
            DocumentosResolver, DocumentosService, EmpleadoService, SubirArchivosService, DeptosService, NotificacionService
        ],
})
export class DocumentosModule
{
}
