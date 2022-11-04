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
            // Si el param files no viene nulo el registro se hara de manera local y si viene null es porque el registro se realizo en la nube
            const rutasArchivos = await this.subirArchivoService.subirArchivos(files);
            console.log('rutas archivo', rutasArchivos);
            if (rutasArchivos.length === 0)
            {
                return null;
            }
            datos.docUrl = rutasArchivos[0];
            const doc = await this.documento.create(datos);
            if (!doc)
            {
                //TODO: Eliminar el archivo localmente ya que no se pudo realizar el registro en la base de datos
                throw new ConflictException({message: 'Ocurrio un error al registrar el documento'});
            }
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
