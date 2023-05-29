import {Injectable} from "@nestjs/common";
import {PlaneacionDto, TPlaneacionType} from "#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto";
import {IPlaneacion} from "#api/libs/models/src/lib/dir-general/planeacion/planeacion.interface";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class ComponenteService
{
    constructor(@InjectModel(PlaneacionDto.name) private planeacion: Model<TPlaneacionType>)
    {
    }

    async actualizarPbrComp(doc: PlaneacionDto, idIndicadorPbr: string, trim1: number, trim2: number, trim3: number, trim4: number): Promise<void>
    {
        let docARegresar: IPlaneacion = null;

        for (const mir of doc.mirCuestionario)
        {
            if (mir.componente)
            {
                if (mir.componente.formComun.length > 0)
                {
                    for (const componente of mir.componente.formComun)
                    {
                        if (componente.idIndicador === idIndicadorPbr)
                        {
                            docARegresar = await this.planeacion.findOneAndUpdate({_id: doc._id, 'mirCuestionario.componente.formComun.idIndicador': idIndicadorPbr},
                                {'mirCuestionario.$.componente.$.trim1': trim1}).exec();
                        }
                    }
                }

                if (mir.componente.formPlanta.length > 0)
                {
                    for (const componente of mir.componente.formPlanta)
                    {
                    }
                }
            }
            //Aqui se van ir colocando los componentes
        }
    }
}
