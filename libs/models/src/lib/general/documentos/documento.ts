import {IDatosArchivo} from '../../upload/upload.interface';
import {file, prop, required} from '@rxweb/reactive-form-validators';
import {TDocumentoReg} from './documento.interface';

export class Documento implements TDocumentoReg
{
    @required({message: 'Es necesario que coloques el asunto que trata el documento'})
    asunto: string;
    @prop()
    folio: string;
    @prop()
    comentario: string;
    @required({message: 'Es necesario que coloques la dependencia de donde proviene el documento'})
    dependencia: string;
    docUrl: string;
    enviadoPor: string;
    @prop({defaultValue: false})
    esInterno: boolean;
    @required({message: 'Selecciona la fecha en que recibiste el documento'})
    fechaRecepcion: number;
    @required({message: 'Selecciona una fecha de entrega'})
    fechaLimiteEntrega: number;
    @file({maxFiles: 1, minFiles: 1, message: 'Debes tener un documento seleccionado'})
    file: IDatosArchivo;
    @required({message: 'Es necesario colocar un identificador del documento'})
    identificadorDoc: string;
    proceso: 'pendiente' | 'terminado';
    @required({message: 'Selecciona el tipo de documento'})
    tipoDoc: string;
    usuarioFolio: string;
    @required({message: 'Es necesario colocar al menos un usuario si el documento es para ti mismo seleccionalo de la lista'})
    usuarios: string[];
    seguimiento: string;
    acuseUrl: string;
    fechaTerminado: number;
    ano: number;
}
