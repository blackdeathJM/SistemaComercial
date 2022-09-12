import {ConflictException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {DocsUsuarioProcesoDto, DocumentoDto, DocumentoType} from '@sistema-comercial/modelos/documento.Dto';
import {Model} from 'mongoose';

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
