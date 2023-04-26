import { PlaneacionDto, TPlaneacionType } from '#api/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EliminarElementoMirDto, FilCentroGestorMirDto, RegMirDto } from '#api/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import { EmpleadoService } from '#api/apps/api/src/app/dir-admon-finanzas/recursos-humanos/empleado/empleado.service';

@Injectable()
export class PlaneacionService
{
    constructor(@InjectModel(PlaneacionDto.name) private planeacion: Model<TPlaneacionType>, private empleadoService: EmpleadoService)
    {
    }

    async filTodos(): Promise<PlaneacionDto[]>
    {
        return this.planeacion.find({}, {}, { sort: { ano: -1 } }).exec();
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

            const { _id, ...resto } = nvo;

            this.planeacion.findByIdAndUpdate(_id, {
                'mirCuestionario.$.semefVerde': 0.00, 'mirCuestionario.$.semefAmarillo': 0.00, 'mirCuestionario.$.semefRojo': 0.00, 'mirCuestionario.$.avanceTrim1': 0.00,
                'mirCuestionario.$.avanceTrim2': 0.00, 'mirCuestionario.$.avanceTrim3': 0.00, 'mirCuestionario.$.avanceTrim4': 0.00, 'mirCuestionario.$.avanceAnual': 0.00
            });

        } else
        {

            return new this.planeacion(planeacion).save();
        }
    }

    async filCentroGestorMir(args: FilCentroGestorMirDto): Promise<PlaneacionDto>
    {
        const res = await this.planeacion.findById(args._id).exec();
        res.mirCuestionario = res.mirCuestionario.filter(value => value.centroGestor === args.centroGestor);
        return res;

    }

    async regMir(datos: RegMirDto): Promise<PlaneacionDto>
    {
        const { _id, esActualizar, ...resto } = datos;

        if (esActualizar)
        {
            return await this.planeacion.findOneAndUpdate({ _id, 'mirCuestionario.idIndicador': resto.idIndicador }, { $set: { 'mirCuestionario.$': resto } }, { new: true }).exec();
        } else
        {
            return await this.planeacion.findByIdAndUpdate(_id, { $push: { 'mirCuestionario': resto } }, { new: true }).exec();
        }
    }

    async eliminarElementoMir(args: EliminarElementoMirDto): Promise<PlaneacionDto>
    {
        return await this.planeacion.findByIdAndUpdate(args._id, { $pull: { mirCuestionario: { idIndicador: args.idIndicador } } }, { new: true }).exec();
    }

    // async regPbr(): Promise<PlaneacionDto>
    // {
    //
    // }
}
