import {TRegComponente} from "./componente.dto";
import {required} from "@rxweb/reactive-form-validators";

export class Componente implements TRegComponente
{
    @required({message: 'Es requerido un nombre para la cabecera'})
    cabecera: string[];

    @required({message: 'El necesario establecer un valor para la cabecera establecida'})
    valor: string[];
}
