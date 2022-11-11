import {Args, Mutation, Parent, Query, ResolveField, ResolveProperty, Resolver} from '@nestjs/graphql';
import {DocumentosService} from './documentos.service';
import {DocsSubirDto, DocsUsuarioProcesoDto, DocumentoDto, DocRegDto, DocFolioDto, DocActFolioDto} from '#api/libs/models/src/lib/general/documentos/documento.Dto';
import {EmpleadoDto} from '#api/libs/models/src/lib/admin/empleado/empleado.dto';
import {EmpleadoService} from '@api-admin/empleado.service';
import {UploadDto} from '#api/libs/models/src/lib/upload/upload.dto';
import {DocsSeguimientoPipe} from '@api-general/documentos/docsSeguimiento.pipe';
import {IEmpleado} from '#api/libs/models/src/lib/admin/empleado/empleado.interface';

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

    @ResolveProperty(() => [EmpleadoDto], {nullable: true})
    async resolveEmpleadoEnviado(@Parent() parent: DocumentoDto): Promise<EmpleadoDto[]>
    {
        const usuarios: IEmpleado[] = [];
        for (const usuario of parent.usuarios)
        {
            const usuarioEncontrado = await this.empleadoService.buscarEmpleadoPorId(usuario);
            usuarios.push(usuarioEncontrado);
        }
        return usuarios;
    }

    @Mutation(() => DocumentoDto, {nullable: false})
    // @UsePipes(new DocsSeguimientoPipe())
    async regDoc(@Args('datos', DocsSeguimientoPipe) datos: DocRegDto, @Args('files', {nullable: true, defaultValue: null}) files: UploadDto): Promise<DocumentoDto>
    {
        return await this.documentosService.regDoc(datos, files);
    }

    @Mutation(() => DocumentoDto)
    async subirDocs(@Args('args') args: DocsSubirDto, @Args('files', {nullable: true, defaultValue: null}) files: UploadDto): Promise<DocumentoDto>
    {
        return await this.documentosService.subirDocs(args, files);
    }

    @Mutation(() => String)
    async genFolioSinReg(@Args('args') args: DocFolioDto): Promise<string>
    {
        return await this.documentosService.genFolioSinReg(args);
    }

    @Mutation(() => DocumentoDto)
    async docActFolio(@Args('args') args: DocActFolioDto): Promise<DocumentoDto>
    {
        return await this.documentosService.docActFolio(args);
    }
}
