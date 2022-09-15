import {IDocumentoReg} from './documento.interface';
import {IDatosArchivo} from '../../upload/upload.interface';
import {file, prop, required} from '@rxweb/reactive-form-validators';

export class Documento implements IDocumentoReg
{
    ano: number;
    @required()
    asunto: string;
    @prop()
    comentario: string;
    @required()
    dependencia: string;
    docUrl: string;
    enviadoPor: string;
    @prop({defaultValue: false})
    esInterno: boolean;
    @required()
    fechaRecepcion: number;
    @prop()
    fechaLimiteEntrega: number;
    @required()
    @file({maxFiles: 1, minFiles: 1, message: 'El documento no es un archivo valido'})
    file: IDatosArchivo;
    @required()
    identificadorDoc: string;
    proceso: 'Pendiente' | 'Terminado';
    @required({message: 'Selecciona el tipo de documento'})
    tipoDoc: string;
    usuarioFolio: string;
    @required({message: 'Es necesario colocar al menos un usuario si el documento es para ti mismo seleccionalo de la lista'})
    usuarios: string[];
}
