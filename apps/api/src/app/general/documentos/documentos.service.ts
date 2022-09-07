import {ConflictException, Injectable} from '@nestjs/common';
import {IDocumentos} from '@sistema-comercial/modelos/documentos.interface';
import {InjectModel} from '@nestjs/mongoose';
import {DocumentosDto, DocumentoType} from '@sistema-comercial/modelos/documentos.dto';
import {Model} from 'mongoose';
import {DocAnoDto} from '@sistema-comercial/modelos/documentos.types';

@Injectable()
export class DocumentosService
{
    constructor(@InjectModel(DocumentosDto.name) private documento: Model<DocumentoType>)
    {
    }

    async documentosPorAno(ano: DocAnoDto): Promise<IDocumentos[]>
    {
        try
        {
            console.log('recibiendo dato del ano', ano.ano);
            return await this.documento.find({...ano}).exec();
        } catch (e)
        {
            throw new ConflictException({message: e});
        }
    }
}
