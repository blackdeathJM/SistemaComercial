import {IDatosArchivo} from '../../upload/upload.interface';
import {file, prop, required} from '@rxweb/reactive-form-validators';
import {TDocumentoReg} from './documento.interface';
import {sanitize, upperCase} from '@rxweb/sanitizers';
export const requerido = 'Este campo es requerido';
@sanitize
export class Documento implements TDocumentoReg
{
    @required({message: requerido})
    asunto: string;
    @upperCase()
    @prop()
    folio: string;
    @prop()
    comentario: string;
    @required({message: requerido})
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
    @required({message: 'Es necesario colocar un identificador'})
    identificadorDoc: string;
    proceso: 'pendiente' | 'terminado';
    @required({message: 'Selecciona el tipo de documento'})
    tipoDoc: string;
    usuarioFolio: string;
    @required({message: 'Coloca al menos un usuario destino'})
    usuarios: string[];
    seguimiento: string;
    acuseUrl: string;
    fechaTerminado: number;
    ano: number;
}
