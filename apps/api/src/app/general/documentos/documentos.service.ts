import {ConflictException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {DocsUsuarioProcesoDto, DocumentoDto, DocumentoType} from '#api/libs/models/src/lib/general/documentos/documento.Dto';

@Injectable()
export class DocumentosService
{
    constructor(@InjectModel(DocumentoDto.name) private documento: Model<DocumentoType>)
    {
    }

// Filtrar los documentos por usuario y por ano
    async docsUsuarioProceso(datos: DocsUsuarioProcesoDto): Promise<DocumentoDto[]>
    {
        try
        {
            return await this.documento.find({usuarios: datos.usuarios}).exec();
        } catch (e)
        {
            throw new ConflictException({message: e});
        }
    }

    async regDoc(datos: DocumentoDto): Promise<DocumentoDto>
    {
        try
        {
            return await this.documento.create(datos);
        } catch (e)
        {
            throw new ConflictException({message: e.codeName});
        }
    }
}
