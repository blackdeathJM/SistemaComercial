import {ConflictException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {DocumentoDto, DocumentoType} from '@sistema-comercial/modelos/documento.Dto';
import {Model} from 'mongoose';
import {DocAnoDto} from '@sistema-comercial/modelos/documentos.types';

@Injectable()
export class DocumentosService
{
    constructor(@InjectModel(DocumentoDto.name) private documento: Model<DocumentoType>)
    {
    }

    async documentosPorAno(datos: DocAnoDto): Promise<DocumentoDto[]>
    {
        try
        {
            return await this.documento.find({...datos}).exec();
        } catch (e)
        {
            throw new ConflictException({message: e});
        }
    }

    async regDoc(datos: DocumentoDto): Promise<DocumentoDto>
    {
        try
        {
            return await this.documento.create(datos);
        } catch (e)
        {
            console.log('registro de doc', e);
            throw new ConflictException({message: e.codeName});
        }
    }
}
