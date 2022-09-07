import {Args, Query, Resolver} from '@nestjs/graphql';
import {DocumentoDto} from '@sistema-comercial/modelos/documento.Dto';
import {DocumentosService} from './documentos.service';
import {DocAnoDto} from '@sistema-comercial/modelos/documentos.types';

@Resolver(() => DocumentoDto)
export class DocumentosResolver
{
    constructor(private documentosService: DocumentosService)
    {
    }

    @Query(() => [DocumentoDto])
    async documentosPorAno(@Args('ano') ano: DocAnoDto): Promise<DocumentoDto[]>
    {
        return await this.documentosService.documentosPorAno(ano);
    }
}
