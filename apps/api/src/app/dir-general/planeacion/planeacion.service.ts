import {ActualizarResponsableDto, EliminarElementoDto, PlaneacionDto, TPlaneacionType} from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {Model} from 'mongoose';
import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {RegMirDto} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {RegAvancesPbrDto, RegPbrDto} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';
import {SumPbrDto} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbrSumatoria.dto';
import {IMeses} from "#api/libs/models/src/lib/common/common";
import {ISumatorias} from "#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
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
                return await this.planeacion.findOneAndUpdate({_id, 'pbrCuestionario': resto.idIndicador}, {$set: {'pbrCuestionario.$': resto}}).exec();
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
            _id, esSumatoriaTrim, esSumatoriaTotal, idIndicador, enero, febrero, marzo, abril, mayo, junio, julio, agosto,
            septiembre, octubre, noviembre, diciembre
        } = datos;

        const trimestres = [[marzo, febrero, enero], [junio, mayo, abril], [septiembre, agosto, julio], [diciembre, noviembre, octubre]];

        let total: number = 0;

        const valoresTrim: number[] = [];

        if (esSumatoriaTrim)
        {
            trimestres.forEach((value, index) =>
            {
                const valor = value.reduce((previousValue, currentValue) => previousValue + currentValue);
                valoresTrim.push(valor);
            });

            total = valoresTrim.reduce((previousValue, currentValue) => previousValue + currentValue);
        } else
        {
            trimestres.forEach((value) =>
            {
                const ultimo = value.find(ultimoValor => ultimoValor !== 0);
                valoresTrim.push(ultimo);
            });
            total = [diciembre, noviembre, octubre, septiembre, agosto, julio, junio, mayo, abril, marzo, febrero, enero].find(value => value !== 0);
        }

        return await this.planeacion.findOneAndUpdate({'_id': _id, 'pbrCuestionario.idIndicador': idIndicador},
            {
                $set: {
                    'pbrCuestionario.$.enero': enero, 'pbrCuestionario.$.febrero': febrero, 'pbrCuestionario.$.marzo': marzo, 'pbrCuestionario.$.trim1': valoresTrim[0],
                    'pbrCuestionario.$.abril': abril, 'pbrCuestionario.$.mayo': mayo, 'pbrCuestionario.$.junio': junio, 'pbrCuestionario.$.trim2': valoresTrim[1],
                    'pbrCuestionario.$.julio': julio, 'pbrCuestionario.$.agosto': agosto, 'pbrCuestionario.$.septiembre': septiembre, 'pbrCuestionario.$.trim3': valoresTrim[2],
                    'pbrCuestionario.$.octubre': octubre, 'pbrCuestionario.$.noviembre': noviembre, 'pbrCuestionario.$.diciembre': diciembre, 'pbrCuestionario.$.trim4': valoresTrim[3],
                    'pbrCuestionario.$.total': total,
                }
            }, {new: true}).exec();
    }

    async sumatoriaPbr(datos: SumPbrDto): Promise<PlaneacionDto>
    {
        const {_id, ids, centroGestor, descripcion, nombreSumatoria, ...resto} = datos;

        const buscarDoc = await this.planeacion.findById(_id).exec();
        const matrizDeValoresMeses: number[][] = [];
        ids.forEach(idIndicador =>
        {
            buscarDoc.pbrCuestionario.forEach((pbr, index) =>
            {
                if (pbr.idIndicador === idIndicador)
                {
                    const arregloMeses: number[] = [pbr.enero, pbr.febrero, pbr.marzo, pbr.abril, pbr.mayo, pbr.junio, pbr.julio, pbr.agosto, pbr.septiembre,
                        pbr.octubre, pbr.noviembre, pbr.diciembre];
                    matrizDeValoresMeses.push(arregloMeses);
                }
            })
        });
        const sumatoriaMeses: number[][] = Array.from({length: 12}, () => []);
        matrizDeValoresMeses.forEach((matrizMeses) =>
        {
            matrizMeses.forEach((value, index) =>
            {
                sumatoriaMeses[index].push(value);
            });
        });
        const sumatoria: ISumatorias =
            {
                enero: sumatoriaMeses[0].reduce((previousValue, currentValue) => previousValue + currentValue),
                febrero: sumatoriaMeses[1].reduce((previousValue, currentValue) => previousValue + currentValue),
                marzo: sumatoriaMeses[2].reduce((previousValue, currentValue) => previousValue + currentValue),
                abril: sumatoriaMeses[3].reduce((previousValue, currentValue) => previousValue + currentValue),
                mayo: sumatoriaMeses[4].reduce((previousValue, currentValue) => previousValue + currentValue),
                junio: sumatoriaMeses[5].reduce((previousValue, currentValue) => previousValue + currentValue),
                julio: sumatoriaMeses[6].reduce((previousValue, currentValue) => previousValue + currentValue),
                agosto: sumatoriaMeses[7].reduce((previousValue, currentValue) => previousValue + currentValue),
                septiembre: sumatoriaMeses[8].reduce((previousValue, currentValue) => previousValue + currentValue),
                octubre: sumatoriaMeses[9].reduce((previousValue, currentValue) => previousValue + currentValue),
                noviembre: sumatoriaMeses[10].reduce((previousValue, currentValue) => previousValue + currentValue),
                diciembre: sumatoriaMeses[11].reduce((previousValue, currentValue) => previousValue + currentValue),
                total: 0,
                ano: 0,
                ids,
                centroGestor,
                descripcion,
                nombreSumatoria,
                idSumatoria: uuidv4()
            };
        return await this.planeacion.findByIdAndUpdate(_id, {$push: {pbrSumatoria: sumatoria}}).exec();
    }

    async calcularSumPbr(meses: IMeses): Promise<void>
    {

    }
}
