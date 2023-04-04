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
        try
        {
            let _id = '';
            const contarDocumentos = await this.seleccion.countDocuments().exec();
            if (contarDocumentos === 0)
            {
                const valoresDefecto: TAgregarSeleccion = {
                    centroGestor: [], unidad: [], dimension: [], frecuencia: [], tipo: []
                };
                const res = await this.seleccion.create(valoresDefecto);
                _id = res.id;
            }
            const actualizacion = {};
            for (const key in input)
            {
                if (key !== '_id' && input[key].indexOf('sinDatos') === -1)
                {
                    actualizacion[key] = input[key].pop();
                }
            }
            if (input._id !== '')
            {
                _id = input._id;
            }
            return await this.seleccion.findByIdAndUpdate(_id, {$push: actualizacion}, {new: true}).exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
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
