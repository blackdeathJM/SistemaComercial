import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ActRolesDto, CrearRolDto, RolesAsigDto, RolesDto} from '#api/libs/models/src/lib/admin/empleado/auth/roles.dto';
import {RolesService} from '@api-admin/roles/roles.service';

@Resolver(() => RolesDto)
export class RolesResolver
{
    constructor(private rolesService: RolesService)
    {
    }

    @Mutation(() => RolesDto, {nullable: true})
    async crearRoles(@Args('args') args: CrearRolDto): Promise<RolesDto>
    {
        return await this.rolesService.crearRoles(args);
    }

    @Mutation(() => Boolean)
    async actPrimerNivel(@Args('role') role: ActRolesDto): Promise<boolean>
    {
        return await this.rolesService.actPrimerNivel(role);
    }

    @Mutation(() => Boolean)
    async actSegundoNivel(@Args('role') role: ActRolesDto): Promise<boolean>
    {
        return this.rolesService.actSegundoNivel(role);
    }

    @Mutation(() => Boolean)
    async actTercerNivel(@Args('role') role: ActRolesDto): Promise<boolean>
    {
        return await this.rolesService.actTercerNivel(role);
    }

    @Query(() => RolesDto, {nullable: true})
    async rolesAsig(@Args() args: RolesAsigDto): Promise<RolesDto>
    {
        return await this.rolesService.rolesAsig(args);
    }
}
