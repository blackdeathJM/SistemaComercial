import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {DocumentosService} from './documentos.service';
import {DocsUsuarioProcesoDto, DocumentoDto} from '#api/libs/models/src/lib/general/documentos/documento.Dto';

@Resolver(() => DocumentoDto)
export class DocumentosResolver
{
    constructor(private documentosService: DocumentosService)
    {
    }

    @Query(() => [DocumentoDto], {defaultValue: []})
    async docsUsuarioProceso(@Args('datos') datos: DocsUsuarioProcesoDto): Promise<DocumentoDto[]>
    {
        return await this.documentosService.docsUsuarioProceso(datos);
    }

    @Mutation(() => DocumentoDto, {nullable: false})
    async regDoc(@Args('datos') datos: DocumentoDto): Promise<DocumentoDto>
    {
        return this.documentosService.regDoc(datos);
    }
}
