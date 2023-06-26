import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {PlaneacionDto, TPlaneacionType} from "#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto";
import {Model} from "mongoose";
import {IPlaneacion} from "#api/libs/models/src/lib/dir-general/planeacion/planeacion.interface";
import {isEmpty} from "lodash";
import {TipoOperaciones} from "#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {ComponenteService} from "#api/apps/api/src/app/dir-general/planeacion/componente.service";

@Injectable()
export class CalculosPbrService
{
    constructor(@InjectModel(PlaneacionDto.name) private planeacion: Model<TPlaneacionType>, private componenteService: ComponenteService)
    {
    }

    async matrizDeValoresMeses(_id: string, ids: string[], doc: IPlaneacion = null): Promise<number[][][]>
    {
        let documento: IPlaneacion = doc;
        if (isEmpty(documento))
        {
            documento = await this.planeacion.findById(_id).exec();
        }

        const filtroIds = ids.map(idIndicador =>
        {
            return documento.pbrCuestionario.filter(v => v.idIndicador === idIndicador)
        });

        const meses: Record<string, number[]> = {
            enero: [],
            febrero: [],
            marzo: [],
            abril: [],
            mayo: [],
            junio: [],
            julio: [],
            agosto: [],
            septiembre: [],
            octubre: [],
            noviembre: [],
            diciembre: []
        };

        filtroIds.forEach((value) =>
        {
            value.forEach((mes) =>
            {
                Object.entries(mes).forEach(([propiedad, valor]) =>
                {
                    if (meses[propiedad])
                    {
                        meses[propiedad].push(valor);
                    }
                });
            });
        });

        return [[meses.diciembre, meses.noviembre, meses.octubre], [meses.septiembre, meses.agosto, meses.julio], [meses.junio, meses.mayo, meses.abril], [meses.marzo, meses.febrero, meses.enero]];
    }

    sumarMeses(matrizMeses: number[][][]): number[][]
    {
        return matrizMeses.map((fila) => fila.map(ele => ele.reduce((acc, act) => acc + act, 0)));
    }

    async calcularAvancerPbr(_id: string, idIndicador: string, centroGestor: string, tipoOperacion: string, trimestres: number[][]): Promise<PlaneacionDto>
    {
        let total: number = 0;
        const valoresTrim: number[] = [];

        const meses = trimestres.map((value, index) => trimestres[index]).flat();

        switch (tipoOperacion)
        {
            case TipoOperaciones.suma:
                trimestres.forEach((value) => valoresTrim.push(value.reduce((acc, act) => acc + act)));
                total = valoresTrim.reduce((acc, act) => acc + act);
                break;
            case TipoOperaciones.ultimo:
                trimestres.forEach(value => valoresTrim.push(Math.max(...value)));
                const voltearValores = valoresTrim.slice();
                total = voltearValores.reverse().find(value => value !== 0);
                break;
            case  TipoOperaciones.promedio:

                trimestres.forEach(value =>
                {
                    const resultado = value.reduce((acc, act) => acc + act);
                    valoresTrim.push(resultado / 3);
                });
                const sumarMeses = meses.reduce((acc, act) => acc + act);
                total = sumarMeses / meses.length;
                break;
        }
        return await this.planeacion.findOneAndUpdate({'_id': _id, 'pbrCuestionario.idIndicador': idIndicador},
            {
                $set: {
                    'pbrCuestionario.$.enero': meses[2], 'pbrCuestionario.$.febrero': meses[1], 'pbrCuestionario.$.marzo': meses[0], 'pbrCuestionario.$.trim1': valoresTrim[0],
                    'pbrCuestionario.$.abril': meses[5], 'pbrCuestionario.$.mayo': meses[4], 'pbrCuestionario.$.junio': meses[3], 'pbrCuestionario.$.trim2': valoresTrim[1],
                    'pbrCuestionario.$.julio': meses[8], 'pbrCuestionario.$.agosto': meses[7], 'pbrCuestionario.$.septiembre': meses[6], 'pbrCuestionario.$.trim3': valoresTrim[2],
                    'pbrCuestionario.$.octubre': meses[11], 'pbrCuestionario.$.noviembre': meses[10], 'pbrCuestionario.$.diciembre': meses[9], 'pbrCuestionario.$.trim4': valoresTrim[3],
                    'pbrCuestionario.$.total': total,
                }
            }, {new: true}).exec();
    }
}
