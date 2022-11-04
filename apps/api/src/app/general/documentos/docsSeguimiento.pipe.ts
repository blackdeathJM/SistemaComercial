import {Injectable, PipeTransform} from '@nestjs/common';
import {DocumentoDto, DocumentoRegDto, DocumentoType} from '#api/libs/models/src/lib/general/documentos/documento.Dto';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class DocsSeguimientoPipe implements PipeTransform
{
    constructor(@InjectModel(DocumentoDto.name) private documento: Model<DocumentoType>)
    {
    }

    async transform(value: DocumentoRegDto): Promise<DocumentoRegDto>
    {
        const ultimoDocumento = await this.documento.countDocuments({ano: value.ano, tipoDoc: value.tipoDoc}).exec();
        value.seguimiento = (ultimoDocumento + 1).toString() + '-' + value.tipoDoc.substring(0, 2) + '-' + value.ano;
        return value;
    }
}
