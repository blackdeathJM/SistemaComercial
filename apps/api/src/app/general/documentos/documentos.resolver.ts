import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {DocumentosService} from './documentos.service';
import {DocsUsuarioProcesoDto, DocumentoDto, DocumentoRegDto} from '#api/libs/models/src/lib/general/documentos/documento.Dto';
import {EmpleadoDto} from '#api/libs/models/src/lib/admin/empleado/empleado.dto';
import {EmpleadoService} from '@api-admin/empleado.service';
import {UploadDto} from '#api/libs/models/src/lib/upload/upload.dto';
import {DocsSeguimientoPipe} from '@api-general/documentos/docsSeguimiento.pipe';
import {GraphQLUpload} from 'graphql-upload';

@Resolver(() => DocumentoDto)
export class DocumentosResolver
{
    constructor(private documentosService: DocumentosService, private empleadoService: EmpleadoService)
    {
    }

    @Query(() => [DocumentoDto], {defaultValue: []})
    async docsUsuarioProceso(@Args('datos') datos: DocsUsuarioProcesoDto): Promise<DocumentoDto[]>
    {
        return await this.documentosService.docsUsuarioProceso(datos);
    }

    @ResolveField(() => EmpleadoDto, {nullable: true})
    async resolveEmpleado(@Parent() parent: DocumentoDto): Promise<EmpleadoDto>
    {
        return await this.empleadoService.buscarEmpleadoPorId(parent.enviadoPor);
    }

    @ResolveField(() => EmpleadoDto, {nullable: true})
    async resolverEmpleadoFolio(@Parent() parent: DocumentoDto): Promise<EmpleadoDto>
    {
        return await this.empleadoService.buscarEmpleadoPorId(parent.usuarioFolio);
    }

    @Mutation(() => DocumentoDto, {nullable: false})
    // @UsePipes(new DocsSeguimientoPipe())
    async regDoc(@Args('datos', DocsSeguimientoPipe) datos: DocumentoRegDto, @Args('files', {nullable: true, defaultValue: null}) files: UploadDto): Promise<DocumentoDto>
    {
        return this.documentosService.regDoc(datos, files);
    }
}
