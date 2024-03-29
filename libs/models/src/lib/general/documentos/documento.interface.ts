import {IEmpleado} from '../../dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';

export interface IDocumento
{
    _id: string;
    seguimiento: string;
    identificadorDoc: string;
    folio: string;
    tipoDoc: string;
    esInterno: boolean;
    dependencia: string;
    comentario: string;
    asunto: string;
    docUrl: string;
    acuseUrl: string;
    fechaRecepcion: number;
    fechaLimiteEntrega: number;
    fechaTerminado: number;
    proceso: 'pendiente' | 'terminado';
    usuarioFolio: string;
    enviadoPor: string;
    ano: number;
    ref: string[];
    usuarios: string[];
    esRef: boolean;
}

export const TIPOS_DOCUMENTO = ['Oficio', 'Memorandum', 'Circular', 'Otro'];
export type TDocumentoReg = Omit<IDocumento, '_id' | 'ref'>;
export type TDocSubir = Pick<IDocumento, '_id' | 'docUrl' | 'acuseUrl'>;

export interface IDocsUsuarioProceso extends Pick<IDocumento, 'proceso' | 'enviadoPor'>
{
    usuario: string;
    esEnviadoPor: boolean;
}

export type TDocRefFolio = Pick<IDocumento, '_id' | 'ref' | 'folio' | 'usuarioFolio'>;

export interface IDocsFechas
{
    usuario: string;
    enviadoPor: string;
    fechaInicial: number;
    fechaFinal: number;
    esEnviadoPor: boolean;
}

export interface IDocActFolio extends Pick<IDocumento, '_id' | 'usuarioFolio' | 'tipoDoc'>
{
    deptoId: string;
}

export type TDocReasignarUsuarios = Pick<IDocumento, '_id' | 'usuarios'>;
export type TDocFinalizar = Pick<IDocumento, '_id' | 'fechaTerminado'>;

export interface IDocsBusquedaGral
{
    usuario: string;
    enviadoPor: string;
    esEnviadoPor: boolean;
    consulta: string;
}

export interface IDocFolio
{
    tipoDoc: string;
    deptoId: string;
}

export interface IResolveDocumento extends IDocumento
{
    resolveEmpleado: IEmpleado;
    resolverEmpleadoFolio: IEmpleado;
    resolveEmpleadoEnviado: IEmpleado[];
}
