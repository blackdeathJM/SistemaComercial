import {Injectable} from "@nestjs/common";
import {PlaneacionDto, TPlaneacionType} from "#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {
    IFormComun,
    TiposFormulario
} from "#api/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {IPlaneacion} from "#api/libs/models/src/lib/dir-general/planeacion/planeacion.interface";

@Injectable()
export class ComponenteService
{
    constructor(@InjectModel(PlaneacionDto.name) private planeacion: Model<TPlaneacionType>)
    {
    }
}
