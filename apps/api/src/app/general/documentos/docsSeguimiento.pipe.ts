import {Injectable, InternalServerErrorException, PipeTransform} from '@nestjs/common';
import {DocumentoDto, DocRegDto, DocumentoType} from '#api/libs/models/src/lib/general/documentos/documento.Dto';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {DocumentosService} from './documentos.service';

@Injectable()
export class DocsSeguimientoPipe implements PipeTransform
{
    constructor(@InjectModel(DocumentoDto.name) private documento: Model<DocumentoType>, private docService: DocumentosService)
    {
    }

    async transform(value: DocRegDto): Promise<DocRegDto>
    {
        try
        {
            const ultimoDocumento = await this.docService.ultimoRegistro(value.tipoDoc);
            value.seguimiento = (ultimoDocumento + 1) + '-' + value.tipoDoc.substring(0, 2).toLowerCase() + '-' + new Date().getFullYear();
            return value;
        }
        catch (e)
        {
            throw new InternalServerErrorException({message: 'Ocurrio un error interno y no se puede contiunar'});
        }
    }
}
