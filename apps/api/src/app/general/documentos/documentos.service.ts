import {ConflictException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {DocsUsuarioProcesoDto, DocumentoDto, DocumentoRegDto, DocumentoType} from '#api/libs/models/src/lib/general/documentos/documento.Dto';
import {SubirArchivosService} from '#api/apps/api/src/app/upload/subir-archivos.service';
import {UploadDto} from '#api/libs/models/src/lib/upload/upload.dto';

@Injectable()
export class DocumentosService
{
    constructor(@InjectModel(DocumentoDto.name) private documento: Model<DocumentoType>, private subirArchivoService: SubirArchivosService)
    {
    }

// Filtrar los documentos por usuario y por ano
    async docsUsuarioProceso(datos: DocsUsuarioProcesoDto): Promise<DocumentoDto[]>
    {
        try
        {
            return await this.documento.find().exec();
        } catch (e)
        {
            throw new ConflictException({message: e});
        }
    }

    async regDoc(datos: DocumentoRegDto, files: UploadDto): Promise<DocumentoDto>
    {
        if (files)
        {
            const rutasArchivos = await this.subirArchivoService.subirArchivos(files);
            if (rutasArchivos.length === 0)
            {
                return null;
            }
            datos.docUrl = rutasArchivos[0];
            return await this.documento.create(datos);
        } else
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
}
