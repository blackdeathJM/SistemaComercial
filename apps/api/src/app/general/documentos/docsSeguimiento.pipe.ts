import {Injectable, InternalServerErrorException, PipeTransform} from '@nestjs/common';
import {DocRegDto} from '#api/libs/models/src/lib/general/documentos/documento.Dto';
import {DocumentosService} from './documentos.service';

@Injectable()
export class DocsSeguimientoPipe implements PipeTransform
{
    constructor(private docService: DocumentosService)
    {
    }

    async transform(value: DocRegDto): Promise<DocRegDto>
    {
        try
        {
            const ultimoDocumento = await this.docService.aumentarSeguimiento(value.tipoDoc);
            value.seguimiento = (ultimoDocumento + 1) + '-' + value.tipoDoc.substring(0, 2).toLowerCase() + '-' + new Date().getFullYear();
            return value;
        }
        catch (e)
        {
            throw new InternalServerErrorException({message: 'Ocurrio un error interno y no se puede contiunar'});
        }
    }
}
