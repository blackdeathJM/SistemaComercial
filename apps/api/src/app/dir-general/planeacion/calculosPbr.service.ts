import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {PlaneacionDto, TPlaneacionType} from "#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto";
import {Model} from "mongoose";
import {IPlaneacion} from "#api/libs/models/src/lib/dir-general/planeacion/planeacion.interface";
import {isEmpty} from "lodash";
import {SumPbrDto} from "#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbrSumatoria.dto";
import {ISumatorias, TipoOperaciones} from "#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {v4 as uuidv4} from 'uuid';
@Injectable()
export class CalculosPbrService
{
    constructor(@InjectModel(PlaneacionDto.name) private planeacion: Model<TPlaneacionType>)
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

    async sumatoriaPbr(datos: SumPbrDto, actualizar: boolean, doc: IPlaneacion): Promise<PlaneacionDto>
    {
        const {_id, ids, centroGestor, descripcion, nombreSumatoria, idSumatoria, sumTrim, sumTotal} = datos;

        const valoresMatrizMeses = await this.matrizDeValoresMeses(_id, ids, doc);
        const sumatoriaMeses = this.sumarMeses(valoresMatrizMeses);
        // const sumatoriaMeses: number[][] = Array.from({length: 12}, () => []);

        const total = sumatoriaMeses.flat(2);
        const pbrSumatoria: ISumatorias = {
            enero: sumatoriaMeses[3][2],
            febrero: sumatoriaMeses[3][1],
            marzo: sumatoriaMeses[3][0],
            trim1: sumTrim ? sumatoriaMeses[3].reduce((acc, act) => acc + act, 0) : sumatoriaMeses[3].find(value => value !== 0),
            abril: sumatoriaMeses[2][2],
            mayo: sumatoriaMeses[2][1],
            junio: sumatoriaMeses[2][0],
            trim2: sumTrim ? sumatoriaMeses[2].reduce((acc, act) => acc + act, 0) : sumatoriaMeses[2].find(value => value !== 0),
            julio: sumatoriaMeses[1][2],
            agosto: sumatoriaMeses[1][1],
            septiembre: sumatoriaMeses[1][0],
            trim3: sumTrim ? sumatoriaMeses[1].reduce((acc, act) => acc + act, 0) : sumatoriaMeses[1].find(value => value !== 0),
            octubre: sumatoriaMeses[0][2],
            noviembre: sumatoriaMeses[0][1],
            diciembre: sumatoriaMeses[0][0],
            trim4: sumTrim ? sumatoriaMeses[0].reduce((acc, act) => acc + act, 0) : sumatoriaMeses[0].find(value => value !== 0),

            total: sumTrim ? total.reduce((acc, act) => acc + act, 0) : total.find(value => value !== 0),
            ano: 0,
            ids,
            centroGestor,
            descripcion,
            nombreSumatoria,
            sumTotal,
            sumTrim,
            idSumatoria: actualizar ? idSumatoria : uuidv4()
        };

        if (actualizar)
        {
            return await this.planeacion.findOneAndUpdate({'_id': _id, 'pbrSumatoria.idSumatoria': idSumatoria}, {$set: {'pbrSumatoria.$': pbrSumatoria}}, {new: true}).exec();
        }
        return await this.planeacion.findByIdAndUpdate(_id, {$addToSet: {pbrSumatoria}}, {new: true}).exec();
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

        // Actualizar los componentes con los trimestres del pbr

        const respuesta = await this.planeacion.findOneAndUpdate({'_id': _id, 'pbrCuestionario.idIndicador': idIndicador},
            {
                $set: {
                    'pbrCuestionario.$.enero': meses[2], 'pbrCuestionario.$.febrero': meses[1], 'pbrCuestionario.$.marzo': meses[0], 'pbrCuestionario.$.trim1': valoresTrim[0],
                    'pbrCuestionario.$.abril': meses[5], 'pbrCuestionario.$.mayo': meses[4], 'pbrCuestionario.$.junio': meses[3], 'pbrCuestionario.$.trim2': valoresTrim[1],
                    'pbrCuestionario.$.julio': meses[8], 'pbrCuestionario.$.agosto': meses[7], 'pbrCuestionario.$.septiembre': meses[6], 'pbrCuestionario.$.trim3': valoresTrim[2],
                    'pbrCuestionario.$.octubre': meses[11], 'pbrCuestionario.$.noviembre': meses[10], 'pbrCuestionario.$.diciembre': meses[9], 'pbrCuestionario.$.trim4': valoresTrim[3],
                    'pbrCuestionario.$.total': total,
                }
            }, {new: true}).exec();
        //TODO: Actualizar el componente con el resultado de los trimestres
        return respuesta;
    }
}
