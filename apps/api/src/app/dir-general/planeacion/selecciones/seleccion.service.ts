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

    async agregarCentroGestor(input: SeleccionDto): Promise<SeleccionDto>
    {
        try
        {
            let _id: string = '';
            const contarDocumentos = await this.seleccion.countDocuments().exec();
            if (contarDocumentos === 0)
            {
                const valoresDefecto: TAgregarSeleccion =
                    {
                        centroGestor: [], unidad: [], dimension: [], frecuencia: [], tipo: []
                    };
                const res = await this.seleccion.create(valoresDefecto);
                _id = res.id;
            }
            const actualizacion = {};
            console.log(input);
            // if (!input.centroGestor.includes('sinDatos'))
            // {
            //     Object.assign(actualizacion, {centroGestor: input.centroGestor.pop()});
            // }
            // if (!input.unidad.includes('sinDatos'))
            // {
            //     Object.assign(actualizacion, {unidad: input.unidad.pop()});
            // }
            // if (!input.dimension.includes('sinDatos'))
            // {
            //     Object.assign(actualizacion, {variableOrigen: input.dimension.pop()});
            // }
            //
            // if (!input.tipo.includes('sinDatos'))
            // {
            //     Object.assign(actualizacion, {tipo: input.tipo.pop()});
            // }
            // if (input._id !== '')
            // {
            //     _id = input._id;
            // }
            // return await this.seleccion.findByIdAndUpdate(_id, {$push: actualizacion}, {new: true});
            return null;
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }

    async centrosGestores(): Promise<SeleccionDto>
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
