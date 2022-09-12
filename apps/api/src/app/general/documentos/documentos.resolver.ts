import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {DocsUsuarioProcesoDto, DocumentoDto} from '@sistema-comercial/modelos/documento.Dto';
import {DocumentosService} from './documentos.service';

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
