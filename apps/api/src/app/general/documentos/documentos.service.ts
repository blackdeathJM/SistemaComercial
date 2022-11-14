import {ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {
    DocActFolioDto, DocFolioDto, DocReasignarUsuarioDto, DocRegDto, DocsEntreFechasDto, DocsSubirDto, DocsUsuarioProcesoDto, DocumentoDto,
    DocumentoType
} from '#api/libs/models/src/lib/general/documentos/documento.Dto';
import {SubirArchivosService} from '#api/apps/api/src/app/upload/subir-archivos.service';
import {UploadDto} from '#api/libs/models/src/lib/upload/upload.dto';
import {DeptosService} from '@api-admin/deptos.service';
import {AppService} from '#api/apps/api/src/app/app.service';

@Injectable()
export class DocumentosService
{
    #ano = new Date().getFullYear();
    #mes = new Date().getMonth() + 1;

    constructor(@InjectModel(DocumentoDto.name) private documento: Model<DocumentoType>, private subirArchivoService: SubirArchivosService, private deptoService: DeptosService)
    {
    }

// Filtrar los documentos por usuario y por ano
    async docsUsuarioProceso(datos: DocsUsuarioProcesoDto): Promise<DocumentoDto[]>
    {
        try
        {
            // Buscar documentos por usuarios, ano, proceso,
            return await this.documento.find({proceso: datos.proceso, ano: this.#ano, usuarios: datos.usuario}, {}, {sort: {fechaRecepcion: -1}}).exec();
        } catch (e)
        {
            throw new ConflictException({message: e});
        }
    }

    async docsEntreFechas(args: DocsEntreFechasDto): Promise<DocumentoDto[]>
    {
        try
        {
        return await this.documento.find({fechaRecepcion: {$gte: args.fechaRecepcion, $lte: args.fechaFinal}})
        } catch (e)
        {

        }
    }

    async regDoc(datos: DocRegDto, files: UploadDto): Promise<DocumentoDto>
    {
        if (files)
        {
            // Si el param files no viene nulo el registro se hara de manera local y si viene null es porque el registro se realizo en la nube
            try
            {
                const rutasArchivos = await this.subirArchivoService.subirArchivos(files);
                if (rutasArchivos.length === 0)
                {
                    return null;
                }
                datos.docUrl = rutasArchivos[0];
                return await this.documento.create(datos);
            } catch (e)
            {
                throw new InternalServerErrorException({message: `Ocurrio un error interno: ${e}`});
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

    async docActFolio(args: DocActFolioDto): Promise<DocumentoDto>
    {
        try
        {
            const folioGenerado = await this.genFolioSinReg({deptoId: args.deptoId, tipoDoc: 'Oficio'});
            return await this.documento.findByIdAndUpdate(args._id, {$set: {folio: folioGenerado, usuarioFolio: args.usuarioFolio}},
                {returnOriginal: false}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: `Ocurrio un error interno en el servidor${e}`});
        }
    }

    async docFinalizar(_id: string): Promise<DocumentoDto>
    {
        const fechaActual = AppService.fechaHoraActual();
        try
        {
            return await this.documento.findByIdAndUpdate(_id, {$set: {proceso: 'terminado', fechaTerminado: fechaActual}}, {returnOriginal: false}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: 'Ocurrio un error inesperado', e});
        }
    }

    async reasignarUsuario(usuarios: DocReasignarUsuarioDto): Promise<DocumentoDto>
    {
        try
        {
            const reasignacionUsuarios = await this.documento.findByIdAndUpdate(usuarios._id, {$set: {usuarios: usuarios.usuarios}}, {returnOriginal: false}).exec();
            if (!reasignacionUsuarios)
            {
                this.enviarError();
            }
            return reasignacionUsuarios;
        } catch (e)
        {

        }
    }

    async subirDocs(args: DocsSubirDto, filesDocs: UploadDto, filesAcuse: UploadDto): Promise<DocumentoDto>
    {
        const urlAchivos: Record<string, string> = {};
        if (filesDocs)
        {
            // codigo por si el documento se va a subir de manera local
        }
        if (filesAcuse)
        {

        }
        if (args.docUrl)
        {
            urlAchivos['docUrl'] = args.docUrl;
        }
        if (args.acuseUrl)
        {
            urlAchivos['acuseUrl'] = args.acuseUrl;
        }
        try
        {
            return await this.documento.findByIdAndUpdate(args._id, {$set: {...urlAchivos}}, {returnOriginal: false, timestamps: {updatedAt: true}}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: `Ocurrio un error interno :${e}`});
        }
    }

    async genFolioSinReg(args: DocFolioDto): Promise<string>
    {
        try
        {
            const ultimoDocumento = await this.ultimoRegistro(args.tipoDoc);
            const {centroGestor} = await this.deptoService.deptoPorId(args.deptoId);
            return `SIMAPAS/${args.tipoDoc.substring(0, 3).toUpperCase()}/${centroGestor}/${ultimoDocumento + 1}/${this.#mes}-${this.#ano}`;
        } catch (e)
        {
            throw new InternalServerErrorException({message: 'Ocurrio un error interno, no se puede continuar', e});
        }
    }

    async ultimoRegistro(tipoDoc: string): Promise<number>
    {
        try
        {
            return await this.documento.countDocuments({ano: this.#ano, tipoDoc}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: 'Ocurrio un error interno no se puede continuar'});
        }
    }

    enviarError(): InternalServerErrorException
    {
        throw new InternalServerErrorException({message: 'Ocurrio un error interno'});
    }

}
