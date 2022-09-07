import {Module} from '@nestjs/common';
import {DocumentosResolver} from './documentos.resolver';
import {DocumentosService} from './documentos.service';
import {MongooseModule} from "@nestjs/mongoose";
import {DocumentoDto, SCHEMA_DOCUMENTOS} from "@sistema-comercial/modelos/documento.Dto";

@Module({
    imports: [MongooseModule.forFeature([{name: DocumentoDto.name, schema: SCHEMA_DOCUMENTOS}])],
    providers:
        [
            DocumentosResolver, DocumentosService
        ],
})
export class DocumentosModule
{
}
