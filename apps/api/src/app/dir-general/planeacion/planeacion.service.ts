import {
    ActualizarResponsableDto,
    EliminarElementoDto,
    PlaneacionDto,
    ReemplazarCompDto,
    TPlaneacionType
} from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {RegMirDto} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {
    AsigActividadDto,
    RecalcularPbrDto,
    RegAvancesPbrDto,
    RegPbrDto
} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';
import {SumPbrDto, TSumPbr} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbrSumatoria.dto';
import {TRegComponente} from "#api/libs/models/src/lib/dir-general/planeacion/componentes/componente.dto";
import {CalculosPbrService} from "#api/apps/api/src/app/dir-general/planeacion/calculosPbr.service";
import {IPlaneacion} from "#api/libs/models/src/lib/dir-general/planeacion/planeacion.interface";
import {ISumatorias} from "#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class PlaneacionService
{
    constructor(@InjectModel(PlaneacionDto.name) private planeacion: Model<TPlaneacionType>, private calculosPbrService: CalculosPbrService)
    {
    }

    async filTodos(): Promise<PlaneacionDto[]>
    {
        return this.planeacion.find({}, {}, {sort: {ano: -1}}).exec();
    }

    async inicializarPlaneacion(planeacion: PlaneacionDto): Promise<PlaneacionDto>
    {
        const {_id, ...resto} = planeacion;
        if (_id)
        {
            const copia = await this.planeacion.findById(planeacion._id).exec();

            const inicializarMeses = {
                enero: 0.00,
                febrero: 0.00,
                marzo: 0.00,
                abril: 0.00,
                mayo: 0.00,
                junio: 0.00,
                julio: 0.00,
                agosto: 0.00,
                septiembre: 0.00,
                octubre: 0.00,
                noviembre: 0.00,
                diciembre: 0.00,
                trim1: 0.00,
                trim2: 0.00,
                trim3: 0.00,
                trim4: 0.00,
                total: 0.00
            }

            const nvaInicializacion: TPlaneacionType = {
                _id: null,
                ano: resto.ano,
                copia: true,
                descripcion: resto.descripcion,
                mirCuestionario: copia.mirCuestionario,
                pbrCuestionario: copia.pbrCuestionario.map(p => ({...p, ...inicializarMeses})),
                pbrSumatoria: copia.pbrSumatoria.map(s => ({...s, ...inicializarMeses}))
            };
            return await new this.planeacion(nvaInicializacion).save();
        }

        return new this.planeacion(resto).save();

    }

    async regMir(datos: RegMirDto): Promise<PlaneacionDto>
    {
        const {_id, esActualizar, ...resto} = datos;

        if (esActualizar)
        {
            return await this.planeacion.findOneAndUpdate({
                _id,
                'mirCuestionario.idIndicador': resto.idIndicador
            }, {$set: {'mirCuestionario.$': resto}}, {new: true}).exec();
        }
        return await this.planeacion.findByIdAndUpdate(_id, {$push: {mirCuestionario: resto}}, {new: true}).exec();
    }

    async regPbr(datos: RegPbrDto): Promise<PlaneacionDto>
    {
        const {_id, esActualizar, ...resto} = datos;
        if (esActualizar)
        {
            const respuesta = await this.planeacion.findOneAndUpdate({
                    _id,
                    'pbrCuestionario.idIndicador': resto.idIndicador
                }, {
                    $set: {
                        'pbrCuestionario.$.responsable': resto.responsable,
                        'pbrCuestionario.$.correo': resto.correo,
                        'pbrCuestionario.$.idEmpleado': resto.idEmpleado,
                        'pbrCuestionario.$.variableOrigen': resto.variableOrigen,
                        'pbrCuestionario.$.unidad': resto.unidad,
                        'pbrCuestionario.$.centroGestor': resto.centroGestor,
                        'pbrCuestionario.$.dato': resto.dato,
                        'pbrCuestionario.$.descripcion': resto.descripcion,
                        'pbrCuestionario.$.tipoOperacion': resto.tipoOperacion
                    }
                },
                {new: true}).exec();
            // Filtramos el resultado de la consulta para obtener solo el documento que fue actualizado
            const cuestionarioActualizado = respuesta.pbrCuestionario.find(value => value.idIndicador === resto.idIndicador);

            const trimestres = [[cuestionarioActualizado.marzo, cuestionarioActualizado.febrero, cuestionarioActualizado.enero], [cuestionarioActualizado.junio, cuestionarioActualizado.mayo, cuestionarioActualizado.abril],
                [cuestionarioActualizado.septiembre, cuestionarioActualizado.agosto, cuestionarioActualizado.julio], [cuestionarioActualizado.diciembre, cuestionarioActualizado.noviembre, cuestionarioActualizado.octubre]];

            return await this.calculosPbrService.calcularAvancerPbr(respuesta._id, resto.idIndicador, resto.centroGestor, resto.tipoOperacion, trimestres);

        }
        return await this.planeacion.findByIdAndUpdate(_id, {$push: {pbrCuestionario: resto}}, {new: true}).exec();
    }

    async actualizarResponsable(args: ActualizarResponsableDto): Promise<PlaneacionDto>
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
    }

    async recalcularPbr(args: RecalcularPbrDto): Promise<PlaneacionDto>
    {
        // Actualizamos el tipo de operacion y retornamos el valor de la consulta actualizada
        const consulta = await this.planeacion.findByIdAndUpdate(args._id, {$set: {'pbrCuestionario.$[elem].tipoOperacion': args.tipoOperacion}},
            {arrayFilters: [{'elem.centroGestor': args.centroGestor}], new: true}).exec();

        // Obtenemos todos los ids del cuestionario y los agregamos a un array
        const resp = consulta.pbrCuestionario.map(async value =>
        {
            if (value.centroGestor === args.centroGestor)
            {
                const trimestres = [[value.marzo, value.febrero, value.enero], [value.junio, value.mayo, value.abril],
                    [value.septiembre, value.agosto, value.julio], [value.diciembre, value.noviembre, value.octubre]];

                return await this.calculosPbrService.calcularAvancerPbr(args._id, value.idIndicador, args.centroGestor, args.tipoOperacion, trimestres)
            }
        });

        return resp[resp.length - 1];
    }

    async regAvancePbr(datos: RegAvancesPbrDto): Promise<PlaneacionDto>
    {
        const {
            _id, tipoOperacion, centroGestor, idIndicador, enero, febrero, marzo, abril, mayo, junio, julio, agosto,
            septiembre, octubre, noviembre, diciembre
        } = datos;

        const trimestres = [[marzo, febrero, enero], [junio, mayo, abril], [septiembre, agosto, julio], [diciembre, noviembre, octubre]];

        const nvoDocumento = await this.calculosPbrService.calcularAvancerPbr(_id, idIndicador, centroGestor, tipoOperacion, trimestres);
        // Actualizamos la sumatoria del centro gestor por si tiene
        if (nvoDocumento.pbrSumatoria && nvoDocumento.pbrSumatoria.length > 0)
        {
            const respuesta = nvoDocumento.pbrSumatoria.map(async value =>
            {
                const datos: TSumPbr =
                    {
                        ...value,
                        _id
                    };
                // return this.sumatoriaPbr(datos, true, nvoDocumento);
                return this.sumatoriaPbr(datos, true, nvoDocumento);
            });
            return respuesta[respuesta.length - 1];
        }
        return nvoDocumento;
    }

    async sumatoriaPbr(datos: SumPbrDto, actualizar: boolean, doc: IPlaneacion): Promise<PlaneacionDto>
    {
        const {_id, ids, centroGestor, descripcion, nombreSumatoria, idSumatoria, sumTrim, sumTotal} = datos;

        const valoresMatrizMeses = await this.calculosPbrService.matrizDeValoresMeses(_id, ids, doc);

        const sumatoriaMeses = this.calculosPbrService.sumarMeses(valoresMatrizMeses);
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
            idSumatoria: actualizar ? idSumatoria : uuidv4().toString().substring(0, 7)
        };
        if (actualizar)
        {
            return await this.planeacion.findOneAndUpdate({'_id': _id, 'pbrSumatoria.idSumatoria': idSumatoria}, {$set: {'pbrSumatoria.$': pbrSumatoria}}, {new: true}).exec();
        }
        return await this.planeacion.findByIdAndUpdate(_id, {$addToSet: {pbrSumatoria}}, {new: true}).exec();
    }

//Funcion creada para obtener la matriz de los valores de los meses y aquí sé procera y se devolvera una matriz con

    async regComponente(datos: TRegComponente): Promise<PlaneacionDto>
    {
        //* Realizar cambios al momento que se registra el avance
        const {_id, idIndicadorMir, ...resto} = datos;

        return await this.planeacion.findOneAndUpdate({_id, 'mirCuestionario.idIndicador': idIndicadorMir},
            {$set: {'mirCuestionario.$.componente': resto}}, {new: true}).exec();
    }

    async eliminarComponente(args: EliminarElementoDto): Promise<PlaneacionDto>
    {
        const {_id, idIndicador, cuestionario} = args;
        return await this.planeacion.findByIdAndUpdate(_id, {$pull: {[cuestionario]: {idIndicador}}}, {new: true}).exec();
    }

    async reemplazarComp(args: ReemplazarCompDto): Promise<PlaneacionDto>
    {
        return await this.planeacion.findOneAndUpdate({_id: args._id, 'mirCuestionario.idIndicador': args.idIndicador},
            {$set: {'mirCuestionario.$.componente': null}}, {new: true}).exec();
    }

    async asigActividad(datos: AsigActividadDto): Promise<PlaneacionDto>
    {
        const {_id} = datos;
        const res = await this.planeacion.findById(_id).exec();
        const cuestionario = [...res.pbrCuestionario];
        const nuevosDatos = cuestionario.map((ele) =>
        {
            if (datos.idsIndicador.includes(ele.idIndicador))
            {
                return {...ele, asignarActividad: datos.idEmpleadoAsig};
            }
            return ele;
        });
        return await this.planeacion.findOneAndUpdate({_id}, {pbrCuestionario: nuevosDatos}).exec();
    }
}
