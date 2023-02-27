import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {AgregarCentroGestorDto, SeleccionDto, SeleccionType} from '#api/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.dto';
import {Model} from 'mongoose';

@Injectable()
export class SeleccionService
{
    constructor(@InjectModel(SeleccionDto.name) private seleccion: Model<SeleccionType>)
    {
    }

    async agregarCentroGestor(input: AgregarCentroGestorDto): Promise<SeleccionDto>
    {
        try
        {
            return this.seleccion.create(input);
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }

    async centrosGestores(): Promise<SeleccionDto[]>
    {
        try
        {
            return await this.seleccion.find().exec();
        } catch (e)
        {
            throw new InternalServerErrorException({message: e});
        }
    }
}
