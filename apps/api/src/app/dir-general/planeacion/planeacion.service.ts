import {ActualizarResponsableDto, EliminarElementoDto, PlaneacionDto, TPlaneacionType} from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {Model} from 'mongoose';
import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {RegMirDto} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {RegAvancesPbrDto, RegPbrDto} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';
import {SumPbrDto, TSumPbr} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbrSumatoria.dto';
import {chunk} from "lodash";
import {ISumatorias, TipoOperaciones} from "#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class PlaneacionService
{
    constructor(@InjectModel(PlaneacionDto.name) private planeacion: Model<TPlaneacionType>)
    {
    }

    async filTodos(): Promise<PlaneacionDto[]>
    {
        return this.planeacion.find({}, {}, {sort: {ano: -1}}).exec();
    }

    async inicializarPlaneacion(planeacion: PlaneacionDto): Promise<PlaneacionDto>
    {
        if (planeacion._id)
        {
            const copia = await this.planeacion.findById(planeacion._id).exec();

            const nvaInicializacion: TPlaneacionType = {
                _id: null,
                ano: new Date().getFullYear(),
                copia: true,
                descripcion: planeacion.descripcion,
                mirCuestionario: copia.mirCuestionario,
                pbrCuestionario: copia.pbrCuestionario,
                pbrSumatoria: copia.pbrSumatoria
            };

            const nvo = await new this.planeacion(nvaInicializacion).save();

            const {_id, ...resto} = nvo;
            //TODO inicializar la copia de planeacion

        } else
        {

            return new this.planeacion(planeacion).save();
        }
    }

    async regMir(datos: RegMirDto): Promise<PlaneacionDto>
    {
        const {_id, esActualizar, ...resto} = datos;

        if (esActualizar)
        {
            return await this.planeacion.findOneAndUpdate({_id, 'mirCuestionario.idIndicador': resto.idIndicador}, {$set: {'mirCuestionario.$': resto}}, {new: true}).exec();
        } else
        {
            return await this.planeacion.findByIdAndUpdate(_id, {$push: {mirCuestionario: resto}}, {new: true}).exec();
        }
    }

    async regPbr(datos: RegPbrDto): Promise<PlaneacionDto>
    {
        const {_id, esActualizar, ...resto} = datos;

        try
        {
            if (esActualizar)
            {
                return await this.planeacion.findOneAndUpdate({_id, 'pbrCuestionario': resto.idIndicador}, {$set: {'pbrCuestionario.$': resto}}, {new: true}).exec();
            } else
            {
                return await this.planeacion.findByIdAndUpdate(_id, {$push: {pbrCuestionario: resto}}, {new: true}).exec();
            }
        } catch (e)
        {
            throw new InternalServerErrorException(e);
        }
    }

    async actualizarResponsable(args: ActualizarResponsableDto): Promise<PlaneacionDto>
    {
        try
        {
            return await this.planeacion.findByIdAndUpdate(args._id,
                {
                    $set: {
                        [`${args.cuestionario}.$[elem].idEmpleado`]: args.idEmpleado,
                        [`${args.cuestionario}.$[elem].responsable`]: args.responsable,
                        [`${args.cuestionario}.$[elem].correo`]: args.correo,
                    }
                },
                {
                    arrayFilters: [{'elem.idEmpleado': args.idEmpleadoAnterior}], new: true
                }).exec();
        } catch (e)
        {
            throw new InternalServerErrorException(e);
        }
    }

    async eliminiarElemento(args: EliminarElementoDto): Promise<PlaneacionDto>
    {
        const {_id, idIndicador, cuestionario} = args;
        return await this.planeacion.findByIdAndUpdate(_id, {$pull: {[cuestionario]: {idIndicador}}}, {new: true}).exec();
    }

    async regAvancePbr(datos: RegAvancesPbrDto): Promise<PlaneacionDto>
    {
        const {
            _id, tipoOperacion, esSumatoriaTotal, idIndicador, enero, febrero, marzo, abril, mayo, junio, julio, agosto,
            septiembre, octubre, noviembre, diciembre
        } = datos;

        const trimestres = [[marzo, febrero, enero], [junio, mayo, abril], [septiembre, agosto, julio], [diciembre, noviembre, octubre]];

        let total: number = 0;

        const valoresTrim: number[] = [];

        switch (tipoOperacion)
        {
            case TipoOperaciones.suma:
                trimestres.forEach((value) =>
                {
                    const valor = value.reduce((previousValue, currentValue) => previousValue + currentValue);
                    valoresTrim.push(valor);
                });

                total = valoresTrim.reduce((previousValue, currentValue) => previousValue + currentValue);
                break;
            case TipoOperaciones.ultimo:
                trimestres.forEach((value) =>
                {
                    const ultimo = value.find(ultimoValor => ultimoValor !== 0);
                    valoresTrim.push(ultimo);
                });
                total = [diciembre, noviembre, octubre, septiembre, agosto, julio, junio, mayo, abril, marzo, febrero, enero].find(value => value !== 0);
                break;
            case TipoOperaciones.promedio:
                trimestres.forEach((value) =>
                {
                    const valor = value.reduce((previousValue, currentValue) => previousValue + currentValue);
                    valoresTrim.push(valor / 3);
                });
                break;
        }

        const actualizarPbr = await this.planeacion.findOneAndUpdate({'_id': _id, 'pbrCuestionario.idIndicador': idIndicador},
            {
                $set: {
                    'pbrCuestionario.$.enero': enero, 'pbrCuestionario.$.febrero': febrero, 'pbrCuestionario.$.marzo': marzo, 'pbrCuestionario.$.trim1': valoresTrim[0],
                    'pbrCuestionario.$.abril': abril, 'pbrCuestionario.$.mayo': mayo, 'pbrCuestionario.$.junio': junio, 'pbrCuestionario.$.trim2': valoresTrim[1],
                    'pbrCuestionario.$.julio': julio, 'pbrCuestionario.$.agosto': agosto, 'pbrCuestionario.$.septiembre': septiembre, 'pbrCuestionario.$.trim3': valoresTrim[2],
                    'pbrCuestionario.$.octubre': octubre, 'pbrCuestionario.$.noviembre': noviembre, 'pbrCuestionario.$.diciembre': diciembre, 'pbrCuestionario.$.trim4': valoresTrim[3],
                    'pbrCuestionario.$.total': total,
                }
            }, {new: true}).exec();
// Actualizamos la sumatoria del centro gestor por si tiene
        if (actualizarPbr.pbrSumatoria && actualizarPbr.pbrSumatoria.length > 0)
        {
            const datos: TSumPbr =
                {
                    _id: actualizarPbr._id,
                    ...actualizarPbr.pbrSumatoria
                }
            return await this.sumatoriaPbr(datos, true);
        }
        return actualizarPbr;
    }

    async matrizDeValoresMeses(_id: string, ids: string[]): Promise<number[][][][]>
    {
        const docPlaneacion = await this.planeacion.findById(_id).exec();
        return ids.map(idIndicador =>
            docPlaneacion.pbrCuestionario.filter(pbr => pbr.idIndicador === idIndicador).map(pbr => [[pbr.diciembre, pbr.noviembre, pbr.octubre], [pbr.septiembre, pbr.agosto, pbr.julio],
                [pbr.junio, pbr.mayo, pbr.abril], [pbr.marzo, pbr.febrero, pbr.enero]]));
    }

    sumarValoresDelMismoMes(valorMatrizMeses: number[][][]): number[]
    {
        const nvoArreglo: number[][] = [];
        for (let i = 0; i < valorMatrizMeses.length; i++)
        {
            nvoArreglo.push(valorMatrizMeses[i].flat());
        }
        return nvoArreglo.reduce((valorAcumulado, valorActual) => valorAcumulado.map((num, i) => num + valorActual[i]));
    }

    async sumatoriaPbr(datos: SumPbrDto, actualizar: boolean): Promise<PlaneacionDto>
    {
        const {_id, ids, centroGestor, descripcion, nombreSumatoria, idSumatoria, sumTrim, sumTotal} = datos;
        const valoresMatrizMeses = await this.matrizDeValoresMeses(_id, ids);

        // const sumatoriaMeses: number[][] = Array.from({length: 12}, () => []);

        //Sumatoria de los meses en vertical empezando por diciembre, se hizo asi para asignar el último valor a los trimestres que lo requieran
        const sumatoriaMeses = this.sumarValoresDelMismoMes(valoresMatrizMeses.flat());

        const ultimoValorDelMes = sumatoriaMeses.slice();

        const arrayTrim = chunk(ultimoValorDelMes, 3);

        const pbrSumatoria: ISumatorias = {
            enero: sumatoriaMeses[11],
            febrero: sumatoriaMeses[10],
            marzo: sumatoriaMeses[9],
            trim1: sumTrim ? arrayTrim[3].reduce((acc, act) => acc + act) : arrayTrim[3].find(value => value !== 0),
            abril: sumatoriaMeses[8],
            mayo: sumatoriaMeses[7],
            junio: sumatoriaMeses[6],
            trim2: sumTrim ? arrayTrim[2].reduce((acc, act) => acc + act) : arrayTrim[2].find(value => value !== 0),
            julio: sumatoriaMeses[5],
            agosto: sumatoriaMeses[4],
            septiembre: sumatoriaMeses[3],
            trim3: sumTrim ? arrayTrim[1].reduce((acc, act) => acc + act) : arrayTrim[1].find(value => value !== 0),
            octubre: sumatoriaMeses[2],
            noviembre: sumatoriaMeses[1],
            diciembre: sumatoriaMeses[0],
            trim4: sumTrim ? arrayTrim[0].reduce((acc, act) => acc + act) : arrayTrim[0].find(value => value !== 0),
            total: sumTrim ? sumatoriaMeses.reduce((acc, act) => acc + act) : sumatoriaMeses[0],
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
            // return await this.planeacion.replaceOne({'_id': _id, 'pbrSumatoria.idSumatoria': idSumatoria}, {pbrSumatoria}, {new: true})
        } else
        {
            return await this.planeacion.findByIdAndUpdate(_id, {$addToSet: {pbrSumatoria}}, {new: true}).exec();
        }
    }
}
