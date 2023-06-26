import {Injectable} from "@nestjs/common";
import {PlaneacionDto, TPlaneacionType} from "#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class ComponenteService
{
    constructor(@InjectModel(PlaneacionDto.name) private planeacion: Model<TPlaneacionType>)
    {
    }
}
