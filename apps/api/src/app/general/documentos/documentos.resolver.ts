import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {DocumentoDto} from '@sistema-comercial/modelos/documento.Dto';
import {DocumentosService} from './documentos.service';
import {DocsUsuarioPendientes} from '@sistema-comercial/modelos/documentos.types';

@Resolver(() => DocumentoDto)
export class DocumentosResolver
{
    constructor(private documentosService: DocumentosService)
    {
    }

    @Query(() => [DocumentoDto], {defaultValue: []})
    async docsUsuarioPendiente(@Args('datos') datos: DocsUsuarioPendientes): Promise<DocumentoDto[]>
    {
        return await this.documentosService.docsUsuarioPendiente(datos);
    }

    @Mutation(() => DocumentoDto, {nullable: false})
    async regDoc(@Args('datos') datos: DocumentoDto): Promise<DocumentoDto>
    {
        return this.documentosService.regDoc(datos);
    }
}
