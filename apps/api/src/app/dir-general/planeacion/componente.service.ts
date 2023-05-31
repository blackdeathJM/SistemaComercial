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

    async actualizarPbrComp(doc: PlaneacionDto, idIndicadorPbr: string, valoresTrim: number[]): Promise<PlaneacionDto>
    {
        let {_id, mirCuestionario} = doc;
        let respuesta: IPlaneacion = null;

        for (const mir of mirCuestionario)
        {
            if (mir.componente)
            {
                if (mir.componente.formComun.length > 0)
                {
                    for (const form of mir.componente.formComun)
                    {
                        if (form.idIndicador.valor === idIndicadorPbr)
                        {
                            await this.planeacion.findOneAndUpdate({'_id': _id, 'mirCuestionario.componente.formComun.idIndicador': idIndicadorPbr},
                                {
                                    $set: {
                                        'mirCuestionario.$.componente.$formComun.$.trim1': valoresTrim[0], 'mirCuestionario.$.componente.$.formComun.$.trim2': valoresTrim[1], 'mirCuestionario.$.componente.$.formComun.$.trim3': valoresTrim[2],
                                        'mirCuestionario.$.componente.$.formComun.$.trim4': valoresTrim[3]
                                    }
                                }, {new: true}).exec();
                        }
                    }

                    const avancesTrim = await this.calculoComponente(mir.componente.tipoForm, mir.componente.formComun);

                    respuesta = await this.planeacion.findOneAndUpdate({'_id': _id, 'mirCuestionario.idIndicador': mir.idIndicador},
                        {$set: {'mirCuestionario.$.avanceTrim1': avancesTrim[0], 'mirCuestionario.$.avanceTrim2': avancesTrim[1], 'mirCuestionario.$.avanceTrim3': avancesTrim[2], 'mirCuestionario.$.avanceTrim4': avancesTrim[3]}},
                        {new: true}).exec();
                }

                if (mir.componente.formPlanta.length > 0)
                {
                    for (const componente of mir.componente.formPlanta)
                    {
                    }
                }
            }
        }

        return respuesta;
    }

    async calculoComponente(tipoForm: string, formComun: IFormComun[] = []): Promise<number[]>
    {
        let avanceTrim1 = 0, avanceTrim2 = 0, avanceTrim3 = 0, avanceTrim4 = 0;
        switch (tipoForm)
        {
            // case TiposFormulario.UN_VALOR:
            //     avanceTrim1 = formComun[0].trim1;
            //     avanceTrim2 = formComun[0].trim2;
            //     avanceTrim3 = formComun[0].trim3;
            //     avanceTrim4 = formComun[0].trim4;
            //     break;
            case TiposFormulario.COMUN:
                // avanceTrim1 = Number((formComun[0].trim1 / formComun[1].trim1).toFixed(2));
                // avanceTrim2 = Number((formComun[0].trim2 / formComun[1].trim2).toFixed(2));
                // avanceTrim3 = Number((formComun[0].trim3 / formComun[1].trim3).toFixed(2));
                // avanceTrim4 = Number((formComun[0].trim4 / formComun[1].trim4).toFixed(2));
                break;
            case TiposFormulario.PERIODO_ANT:
                // avanceTrim1 = this.sumarValoresTrimPeriodoAnt('trim1', formComun);
                // avanceTrim2 = this.sumarValoresTrimPeriodoAnt('trim2', formComun);
                // avanceTrim3 = this.sumarValoresTrimPeriodoAnt('trim3', formComun);
                // avanceTrim4 = this.sumarValoresTrimPeriodoAnt('trim4', formComun);
                break;
            case TiposFormulario.PTAR:
                break;
        }

        return [avanceTrim1, avanceTrim2, avanceTrim3, avanceTrim4];
    }

    sumarValoresTrimPeriodoAnt(trim: string, form: IFormComun[]): number
    {
        if (form.length === 1)
        {
            const restar = form[0][trim] - form[1][trim];
            const dividir = restar / form[1][trim];
            return Number(dividir.toFixed(2));
        } else
        {
            return form.map(trimestre => trimestre[trim]).reduce((acc, act) => acc + act, 0);
        }
    }
}
