import {ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {
    DocActFolioDto,
    DocFolioDto,
    DocReasignarUsuarioDto,
    DocRefFolioDto,
    DocRegDto,
    DocsBusquedaGralDto,
    DocsFechasDto,
    DocsRefDto,
    DocsSubirDto,
    DocsUsuarioProcesoDto,
    DocumentoDto,
    DocumentoType
} from '#api/libs/models/src/lib/general/documentos/documento.Dto';
import {SubirArchivosService} from '#api/apps/api/src/app/upload/subir-archivos.service';
import {UploadDto} from '#api/libs/models/src/lib/upload/upload.dto';
import {IDocumento} from '#api/libs/models/src/lib/general/documentos/documento.interface';
import {AppService} from '#api/apps/api/src/app/app.service';
import {INotificacion} from '#api/libs/models/src/lib/general/notificacion/notificacion.interface';
import {subNotificacion} from '@api-general/notificaciones/notificacion.resolver';
import {NotificacionService} from '@api-general/notificaciones/notificacion.service';
import {DeptosService} from '#api/apps/api/src/app/dir-admon-finanzas/recursos-humanos/deptos/deptos.service';


@Injectable()
export class DocumentosService
{
    constructor(@InjectModel(DocumentoDto.name) private documento: Model<DocumentoType>, private subirArchivoService: SubirArchivosService, private deptoService: DeptosService,
                private notificacionService: NotificacionService)
    {
    }

// Filtrar los documentos por usuario
    async docsUsuarioProceso(datos: DocsUsuarioProcesoDto): Promise<DocumentoDto[]>
    {
        const tipoBusqueda: Record<string, string> = {};
        const consulta = {proceso: datos.proceso};
        if (datos.esEnviadoPor)
        {
            tipoBusqueda['enviadoPor'] = datos.enviadoPor;
        } else
        {
            tipoBusqueda['usuarios'] = datos.usuario;
        }
        const buscar = Object.assign(consulta, tipoBusqueda);
        try
        {
            // Buscar documentos por usuarios, ano, proceso,
            return await this.documento.find({...buscar}, {}, {sort: {fechaRecepcion: -1}}).exec();
        } catch (e)
        {
            throw new ConflictException({message: e.codeName});
        }
    }

    async docsFechas(args: DocsFechasDto): Promise<DocumentoDto[]>
    {
        const fechas = {fechaRecepcion: {$gte: args.fechaInicial, $lte: args.fechaFinal}};
        const usuarioEnviadoPor: Record<string, string> = {};

        if (args.esEnviadoPor)
        {
            usuarioEnviadoPor['enviadoPor'] = args.enviadoPor;
        } else
        {
            usuarioEnviadoPor['usuarios'] = args.usuario;
        }
        const valor = Object.assign(usuarioEnviadoPor, fechas);
        try
        {
            return await this.documento.find({...valor}, {}, {sort: {fechaRecepcion: -1}}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }

    async docsBusquedaGral(args: DocsBusquedaGralDto): Promise<DocumentoDto[]>
    {
        const consulta: Record<string, string> = {};
        if (args.esEnviadoPor)
        {
            consulta['enviadoPor'] = args.enviadoPor;
        } else
        {
            consulta['usuarios'] = args.usuario;
        }

        try
        {
            return await this.documento.find({
                ...consulta, $or:
                    [
                        {identificadorDoc: {$regex: args.consulta, $options: 'i'}},
                        {asunto: {$regex: args.consulta, $options: 'i'}},
                        {dependencia: {$regex: args.consulta, $options: 'i'}},
                        {tipoDoc: {$regex: args.consulta, $options: 'i'}}]
            }).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
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
                throw new InternalServerErrorException({message: e.codeName});
            }
        } else
        {
            try
            {
                const registro = await this.documento.create(datos);

                registro.usuarios.map(async (usuario) =>
                {
                    const notificacion: INotificacion =
                        {
                            imagen: null,
                            leido: false,
                            link: '/sistema-comercial/general/mis-documentos',
                            icono: 'heroicons_outline:document-text',
                            tiempo: AppService.fechaHoraActual(),
                            titulo: `Nuevo ${registro.tipoDoc}`,
                            usarRouter: true,
                            descripcion: registro.asunto,
                            idUsuario: usuario
                        };
                    const notRegistrado = await this.notificacionService.regNot(notificacion);
                    await subNotificacion.publish('notificar', notRegistrado);
                });
                return registro;
            } catch (e)
            {
                throw new ConflictException({message: e.codeName});
            }
        }
    }

    async docRef(args: DocsRefDto): Promise<DocumentoDto[]>
    {
        const ano = new Date().getFullYear();
        // Carga todos los documentos para agregar referencia a folios ya registrados en un documento
        const {_id, usuario} = args;
        try
        {
            return await this.documento.find({_id: {$ne: {_id}}, folio: {$eq: null}, usuarios: usuario, proceso: 'pendiente', ano, tipoDoc: 'Oficio'}).exec();
        } catch (e)
        {
            throw new ConflictException({message: e});
        }
    }

    async docRefFolio(entradas: DocRefFolioDto): Promise<DocumentoDto[]>
    {
        const docsAsig: IDocumento[] = [];
        try
        {
            const {_id, folio, ref, usuarioFolio} = entradas;
            //buscamos el documento por el seguimiento y actualizamos los campos dando por finalizado el documento
            await ref.map(async (seguimiento) =>
            {
                try
                {
                    const docsAsignados = await this.documento.findOneAndUpdate({seguimiento}, {$set: {folio, esRef: true, usuarioFolio, proceso: 'terminado'}},
                        {new: true}).exec();
                    if (docsAsignados)
                    {
                        docsAsig.push(docsAsignados);
                    }
                } catch (e)
                {
                    throw new ConflictException({message: e});
                }
            });
            // Buscamos el documento principal y seteamos el arreglo de referencias
            const docFolioPrincipal = await this.documento.findByIdAndUpdate(_id, {$set: {ref}}, {new: true}).exec();
            docsAsig.push(docFolioPrincipal);
            return docsAsig;
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    async docActFolio(args: DocActFolioDto): Promise<DocumentoDto>
    {
        try
        {
            const folioGenerado = await this.genFolioSinReg({deptoId: args.deptoId, tipoDoc: args.tipoDoc});
            return await this.documento.findByIdAndUpdate(args._id, {$set: {folio: folioGenerado, usuarioFolio: args.usuarioFolio}},
                {returnOriginal: false}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }

    async docFinalizar(_id: string): Promise<DocumentoDto>
    {
        const fechaTerminado = AppService.fechaHoraActual();
        try
        {
            return await this.documento.findByIdAndUpdate(_id, {$set: {proceso: 'terminado', fechaTerminado}}, {returnOriginal: false}).exec();
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
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    async subirDocs(args: DocsSubirDto, filesDocs: UploadDto, filesAcuse: UploadDto): Promise<DocumentoDto>
    {
        const urlAchivos: Record<string, string | number> = {};
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
            urlAchivos['proceso'] = 'terminado';
            urlAchivos['fechaTerminado'] = AppService.fechaHoraActual();
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
        const ano = new Date().getFullYear();
        const mes = new Date().getMonth() + 1;
        try
        {
            const ultimoDocumento = await this.ultimoRegistro(args.tipoDoc);
            const {centroGestor} = await this.deptoService.deptoPorId(args.deptoId);
            return `SIMAPAS/${args.tipoDoc.substring(0, 3).toUpperCase()}/${centroGestor}/${ultimoDocumento + 1}/${mes}-${ano}`;
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    async ultimoRegistro(tipoDoc: string): Promise<number>
    {
        const ano = new Date().getFullYear();
        try
        {
            return await this.documento.countDocuments({ano, tipoDoc, folio: {$ne: null}}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }

    async aumentarSeguimiento(tipoDoc: string): Promise<number>
    {
        const ano = new Date().getFullYear();
        try
        {
            return await this.documento.countDocuments({ano, tipoDoc}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e.codeName});
        }
    }

    enviarError(): InternalServerErrorException
    {
        throw new InternalServerErrorException({message: 'Ocurrio un error interno'});
    }
}
