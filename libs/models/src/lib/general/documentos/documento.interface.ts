import {IDatosArchivo} from '../../upload/upload.interface';

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
}

// export type IRegistroDoc = Omit<IDocumento, '_id' | 'folio' | 'acuseUrl' | 'fechaLimiteEntrega' | 'fechaTerminado' | 'ref' | 'usuarioFolio'>;
export interface IDocumentoReg extends Omit<IDocumento, '_id' | 'folio' | 'acuseUrl' | 'fechaTerminado' | 'ref'>
{
    file: IDatosArchivo;
}
