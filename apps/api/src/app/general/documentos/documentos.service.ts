import {ConflictException, Injectable} from '@nestjs/common';
import {IDocumentos} from '@sistema-comercial/modelos/documentos.interface';
import {InjectModel} from '@nestjs/mongoose';
import {DocumentosDto, DocumentoType} from '@sistema-comercial/modelos/documentos.dto';
import {Model} from 'mongoose';
import {DocAnoInput} from '@sistema-comercial/modelos/documentos.types';

@Injectable()
export class DocumentosService
{
    constructor(@InjectModel(DocumentosDto.name) private documento: Model<DocumentoType>)
    {
    }

    async documentosPorAno(ano: DocAnoInput): Promise<IDocumentos[]>
    {
        try
        {
            return await this.documento.find({ano}).exec();
        } catch (e)
        {
            throw new ConflictException({message: e});
        }
    }
}
