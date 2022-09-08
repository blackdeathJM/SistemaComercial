import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {DocumentoDto} from '@sistema-comercial/modelos/documento.Dto';
import {DocumentosService} from './documentos.service';
import {DocAnoDto} from '@sistema-comercial/modelos/documentos.types';

@Resolver(() => DocumentoDto)
export class DocumentosResolver
{
    constructor(private documentosService: DocumentosService)
    {
    }

    @Query(() => [DocumentoDto], {defaultValue: []})
    async documentosPorAno(@Args('ano') ano: DocAnoDto): Promise<DocumentoDto[]>
    {
        return await this.documentosService.documentosPorAno(ano);
    }

    @Mutation(() => DocumentoDto, {nullable: false})
    async regDoc(@Args('datos') datos: DocumentoDto): Promise<DocumentoDto>
    {
        return this.documentosService.regDoc(datos);
    }
}
