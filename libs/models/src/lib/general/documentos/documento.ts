import {IDocumento} from './documento.interface';
import {required} from '@rxweb/reactive-form-validators';

export class Documento implements IDocumento
{
    acuseUrl: string;
    ano: number;
    @required({message: 'El asunto es requerido'})
    asunto: string;
    comentario: string;
    @required({message: 'La dependencia es requerida'})
    dependencia: string;
    docUrl: string;
    @required({message: 'El usuario que envia es requerido'})
    enviadoPor: string;
    esInterno: boolean;
    fechaLimiteEntrega: number;
    @required({message: 'Es necesario colocar la fecha de recepcion del archivo'})
    fechaRecepcion: number;
    fechaTerminado: number;
    folio: string;
    @required({message: 'Es necesario colocar un identificador al documento'})
    identificadorDoc: string;
    proceso: 'Pendiente' | 'Terminado';
    ref: string[];
    tipoDoc: string;
    usuarioFolio: string;
    @required({message: 'Es necesario asignar por lo menos un destino del documento'})
    usuarios: string[];
}

