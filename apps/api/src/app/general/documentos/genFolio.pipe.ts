import {Injectable, InternalServerErrorException, PipeTransform} from '@nestjs/common';
import {DocumentoDto, DocumentoType} from '#api/libs/models/src/lib/general/documentos/documento.Dto';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {DocumentosService} from '@api-general/documentos/documentos.service';

@Injectable()
export class GenFolioPipe implements PipeTransform
{
    constructor(@InjectModel(DocumentoDto.name) private documento: Model<DocumentoType>, private documentoService: DocumentosService)
    {
    }
    async transform(tipoDoc: string): Promise<string>
    {
        const mes = new Date().getMonth() + 1;
        const ano = new Date().getFullYear();
        try
        {
            const ultimoDocumento = await this.documentoService.ultimoRegistro(tipoDoc);
            return `SIMAPAS/${tipoDoc.substring(0, 3).toUpperCase()}/centro/${ultimoDocumento + 1}/${mes}-${ano}`;
        }
        catch (e)
        {
            throw new InternalServerErrorException({message: 'Ocurrio un error interno, no se puede continuar'});
        }
    }
}
