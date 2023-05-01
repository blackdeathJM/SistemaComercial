import {ActualizarResponsableDto, EliminarElementoDto, PlaneacionDto, TPlaneacionType} from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {Model} from 'mongoose';
import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {RegMirDto} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {RegPbrDto} from '#api/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';
import {IMirCuestionario} from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.interface';

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
                pbrCuestionario: copia.pbrCuestionario
            };

            const nvo = await new this.planeacion(nvaInicializacion).save();

            const {_id, ...resto} = nvo;

            this.planeacion.findByIdAndUpdate(_id, {
                'mirCuestionario.$.semefVerde': 0.00, 'mirCuestionario.$.semefAmarillo': 0.00, 'mirCuestionario.$.semefRojo': 0.00, 'mirCuestionario.$.avanceTrim1': 0.00,
                'mirCuestionario.$.avanceTrim2': 0.00, 'mirCuestionario.$.avanceTrim3': 0.00, 'mirCuestionario.$.avanceTrim4': 0.00, 'mirCuestionario.$.avanceAnual': 0.00
            });

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

    async actualizarResponsable(args: ActualizarResponsableDto): Promise<any>
    {
        try
        {
            const respuesta = await this.planeacion.findByIdAndUpdate(args._id).exec();
            const filtro: IMirCuestionario[] = [];
            respuesta.mirCuestionario.map((value) =>
            {
                const {idEmpleado, correo, responsable, ...resto} = value;
                if (value.idEmpleado === args.idEmpleadoAnterior)
                {
                    filtro.push({idEmpleado: args.idEmpleado, responsable: args.responsable, correo: args.correo, ...resto});
                } else
                {
                    filtro.push(value);
                }
            });
            return await this.planeacion.findByIdAndUpdate(args._id, {$set: {mirCuestionario: filtro}}).exec();
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
}
