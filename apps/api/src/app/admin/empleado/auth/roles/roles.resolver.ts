import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {CrearRolDto, RolesAsigDto, RolesDto} from '#api/libs/models/src/lib/admin/empleado/auth/roles.dto';
import {RolesService} from '@api-admin/roles/roles.service';

@Resolver(() => RolesDto)
export class RolesResolver
{
    constructor(private rolesService: RolesService)
    {
    }

    @Mutation(() => RolesDto)
    async crearRoles(@Args('args') args: CrearRolDto): Promise<RolesDto>
    {
        return await this.rolesService.crearRoles(args);
    }

    @Query(() => RolesDto)
    async rolesAsig(@Args() args: RolesAsigDto): Promise<RolesDto>
    {
        return await this.rolesService.rolesAsig(args);
    }
}
