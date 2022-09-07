import {Module} from '@nestjs/common';
import {DocumentosResolver} from './documentos.resolver';
import {DocumentosService} from './documentos.service';
import {MongooseModule} from "@nestjs/mongoose";
import {DocumentosDto, SCHEMA_DOCUMENTOS} from "@sistema-comercial/modelos/documentos.dto";

@Module({
    imports: [MongooseModule.forFeature([{name: DocumentosDto.name, schema: SCHEMA_DOCUMENTOS}])],
    providers:
        [
            DocumentosResolver, DocumentosService
        ],
})
export class DocumentosModule
{
}
