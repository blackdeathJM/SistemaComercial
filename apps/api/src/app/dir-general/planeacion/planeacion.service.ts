import {ActualizarResponsableDto, EliminarElementoDto, PlaneacionDto, TPlaneacionType} from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {Model} from 'mongoose';
import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {RegMirDto} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {RegAvancesPbrDto, RegPbrDto} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';
import {SumPbrDto} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbrSumatoria.dto';

@Injectable()
export class PlaneacionService
{
    trim1 = 0;
    trim2 = 0;
    trim3 = 0;
    trim4 = 0;
    total = 0;

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
            trimestres.forEach((value) =>
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

        if (actualizarPbr.pbrSumatoria && actualizarPbr.pbrSumatoria.length > 0)
        {

        }
        return actualizarPbr;
    }

    async matrizDeValoresMeses(_id: string, ids: string[]): Promise<number[][][][]>
    {
        const docPlaneacion = await this.planeacion.findById(_id).exec();
        return ids.map(idIndicador =>
            docPlaneacion.pbrCuestionario.filter(pbr => pbr.idIndicador === idIndicador).map(pbr => [[pbr.diciembre, pbr.noviembre, pbr.octubre], [pbr.septiembre, pbr.agosto, pbr.julio], [pbr.junio, pbr.mayo, pbr.abril],
                [pbr.marzo, pbr.febrero, pbr.enero]]));
    }

    ultimoValorDelMes(valorMatrizMeses: number[][][], sumTrim: boolean): void
    {
        console.log(valorMatrizMeses);
    }

    async sumatoriaPbr(datos: SumPbrDto): Promise<PlaneacionDto>
    {
        const {
            _id, ids, centroGestor, descripcion, nombreSumatoria, idSumatoria, sumTrim, sumTotal, trim1,
            trim2, trim3, trim4, total
        } = datos;

        const valoresMatrizMeses = await this.matrizDeValoresMeses(_id, ids);


        const sumatoriaMeses: number[][] = Array.from({length: 12}, () => []);

        this.ultimoValorDelMes(valoresMatrizMeses.flat(), sumTrim);

        // matrizDeValoresMeses.flat().forEach((matrizMeses) =>
        // {
        //     matrizMeses.forEach((value, index) =>
        //     {
        //         sumatoriaMeses[index].push(value);
        //     });
        // });
        // const sumar: number[] = [];
        // for (let i = 0; i < 12; i++)
        // {
        //     sumar.push(sumatoriaMeses[i].reduce((previo, actual) => previo + actual));
        // }
        // const pbrSumatoria: ISumatorias = {
        //     enero: sumar[0],
        //     febrero: sumar[1],
        //     marzo: sumar[2],
        //     abril: sumar[3],
        //     mayo: sumar[4],
        //     junio: sumar[5],
        //     julio: sumar[6],
        //     agosto: sumar[7],
        //     septiembre: sumar[8],
        //     octubre: sumar[9],
        //     noviembre: sumar[10],
        //     diciembre: sumar[11],
        //     total: 0,
        //     ano: 0,
        //     ids,
        //     centroGestor,
        //     descripcion,
        //     nombreSumatoria,
        //     idSumatoria: idSumatoria === null ? uuidv4() : idSumatoria
        // };
        // return await this.planeacion.findByIdAndUpdate(_id, {$addToSet: {pbrSumatoria}}).exec();
        return null;
    }
}
