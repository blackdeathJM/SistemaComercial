import {TIniPlaneacion} from "./planeacion.dto";
import {numeric, NumericValueType, prop} from "@rxweb/reactive-form-validators";
import {IMirCuestionario} from "./mir/mir.interface";
import {IPbrCuestionario} from "./pbr-usuarios/pbr.interface";

export class Planeacion implements TIniPlaneacion
{
    @prop({defaultValue: new Date().getFullYear()})
    ano: number;

    @prop({defaultValue: true})
    copia: boolean;

    @prop()
    descripcion: string;

    @prop({defaultValue: []})
    mirCuestionario: IMirCuestionario[];

    @prop({defaultValue: []})
    pbrCuestionario: IPbrCuestionario[];
}
