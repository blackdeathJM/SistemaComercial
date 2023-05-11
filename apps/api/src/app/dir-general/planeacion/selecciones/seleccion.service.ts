import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {SeleccionDto, SeleccionType, TAgregarSeleccion} from '#api/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.dto';
import {Model} from 'mongoose';

@Injectable()
export class SeleccionService
{
    constructor(@InjectModel(SeleccionDto.name) private seleccion: Model<SeleccionType>)
    {
    }

    async regSeleccion(input: SeleccionDto): Promise<SeleccionDto>
    {
        //TODO revisar el codigo porque no funciona correctamente

        const {_id, ...resto} = input;
        let id = '';
        const contarDocumentos = await this.seleccion.countDocuments().exec();
        if (contarDocumentos === 0)
        {
            const valoresDefecto: TAgregarSeleccion = {
                centroGestor: [], unidad: [], dimension: [], frecuencia: [], tipo: []
            };
            const res = await new this.seleccion(valoresDefecto).save();
            id = res._id;
        }
        const actualizacion = {};
        for (const key in resto)
        {
            if (resto[key].indexOf('sinDatos') === -1)
            {
                actualizacion[key] = resto[key].shift();
            }
        }
        if (_id !== null)
        {
            id = _id;
        }

        return await this.seleccion.findByIdAndUpdate(id, {$push: actualizacion}, {new: true}).exec();
    }

    async selecciones(): Promise<SeleccionDto>
    {
        try
        {
            return await this.seleccion.findOne().exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }
}
