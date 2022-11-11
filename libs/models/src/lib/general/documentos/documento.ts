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
    file: FileList;
    @required({message: 'Es necesario colocar un identificador'})
    identificadorDoc: string;
    proceso: 'pendiente' | 'terminado';
    // @disable({
    //     conditionalExpression: (control: AbstractControl) => false
    // })
    // @required({conditionalExpression: (x: { folio: null; }) => x.folio === null, message: 'El tipo de documento es requerido'})
    @required({message: 'El tipo de documento es requerido'})
    tipoDoc: string;
    usuarioFolio: string;
    @required({message: 'Coloca al menos un usuario destino'})
    usuarios: string[];
    seguimiento: string;
    acuseUrl: string;
    fechaTerminado: number;
    ano: number;
}

export class Archivos
{
    @file({maxFiles: 1, minFiles: 1})
    docArchivo: FileList;
    @file({maxFiles: 1, minFiles: 1})
    acuseArchivo: FileList;
}
