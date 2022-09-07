import {Args, Query, Resolver} from '@nestjs/graphql';
import {DocumentosDto} from '@sistema-comercial/modelos/documentos.dto';
import {DocumentosService} from './documentos.service';
import {DocAnoDto} from '@sistema-comercial/modelos/documentos.types';

@Resolver(() => DocumentosDto)
export class DocumentosResolver
{
    constructor(private documentosService: DocumentosService)
    {
    }

    @Query(() => [DocumentosDto])
    async documentosPorAno(@Args('ano') ano: DocAnoDto): Promise<DocumentosDto[]>
    {
        return await this.documentosService.documentosPorAno(ano);
    }
}
