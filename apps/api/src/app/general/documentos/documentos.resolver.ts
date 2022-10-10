import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {DocumentosService} from './documentos.service';
import {DocsUsuarioProcesoDto, DocumentoDto, DocumentoRegDto} from '#api/libs/models/src/lib/general/documentos/documento.Dto';
import {IDocumento} from '#api/libs/models/src/lib/general/documentos/documento.interface';
import {EmpleadoDto} from '#api/libs/models/src/lib/admin/empleado/empleado.dto';
import {IEmpleado} from '#api/libs/models/src/lib/admin/empleado/empleado.interface';
import {EmpleadoService} from '@api-admin/empleado.service';
import {NotFoundException} from '@nestjs/common';

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

    @ResolveField(() => EmpleadoDto)
    async resolveEmpleado(@Parent() parent: DocumentoDto): Promise<IEmpleado | NotFoundException>
    {
        return await this.empleadoService.buscarEmpleadoPorId(parent.enviadoPor);
    }

    @ResolveField(() => EmpleadoDto)
    async ResolverEmpleadoFolio(@Parent() parent: DocumentoDto): Promise<IEmpleado | NotFoundException>
    {
        return await this.empleadoService.buscarEmpleadoPorId(parent.usuarioFolio);
    }

    @Mutation(() => DocumentoDto, {nullable: false})
    async regDoc(@Args('datos') datos: DocumentoRegDto): Promise<IDocumento>
    {
        return this.documentosService.regDoc(datos);
    }
}
