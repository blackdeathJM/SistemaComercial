import {IEmpleado} from '../../admin/empleado/empleado.interface';

export interface IDocumento
{
    _id?: string;
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
    proceso: 'Pendiente' | 'Terminado';
    usuarioFolio: string;
    enviadoPor: string;
    ano: number;
    ref: string[];
    usuarios: string[];
    //Resolve
    resolveEmpleado?: IEmpleado;
}

export const TIPOS_DOCUMENTO = ['Oficio', 'Memorandum', 'Circular', 'Otro'];
export type IDocumentoReg = Omit<IDocumento, '_id' | 'folio' | 'acuseUrl' | 'fechaTerminado' | 'ref'>;
