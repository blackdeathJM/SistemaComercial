import {IEmpleado} from '../../admin/empleado/empleado.interface';

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
}

export const TIPOS_DOCUMENTO = ['Oficio', 'Memorandum', 'Circular', 'Otro'];
export type TDocumentoReg = Omit<IDocumento, '_id' | 'ref'>;
export type TDocSubir = Pick<IDocumento, '_id' | 'docUrl' | 'acuseUrl'>;
export type TDocUsuarioProceso = Pick<IDocumento, '_id' | 'proceso' | 'usuarios'>;

export interface IDocActFolio extends Pick<IDocumento, '_id' | 'usuarioFolio'>
{
    deptoId: string;
}

export type TDocReasignarUsuarios = Pick<IDocumento, '_id' | 'usuarios'>;

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
