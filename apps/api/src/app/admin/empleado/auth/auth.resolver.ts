import {Args, Context, Mutation, Resolver, Subscription} from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from './guards/gql-auth.guard';
import {EmpleadoDto} from '#api/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.dto';
import {AuthDto} from '#api/libs/models/src/lib/admin/empleado/auth/auth.dto';
import {CambioContrsenaDto} from '#api/libs/models/src/lib/admin/empleado/auth/auth.input.dto';
import {LoginDto, LoginRespuestaDto} from '#api/libs/models/src/lib/admin/empleado/auth/login.dto';
import {ModificadoPorDto} from '#api/libs/models/src/lib/common/common.dto';
import {PubSub} from 'graphql-subscriptions';

export const subRoles: PubSub = new PubSub();

@Resolver(() => AuthDto)
export class AuthResolver
{

    constructor(private authService: AuthService)
    {
    }

    @Mutation(() => EmpleadoDto)
    async registroSesion(@Args('_id') _id: string, @Args('auth') auth: AuthDto, @Args('modificadoPor') modificadoPor: ModificadoPorDto): Promise<EmpleadoDto>
    {
        return await this.authService.registroSesion(_id, auth, modificadoPor);
    }

    @Mutation(() => EmpleadoDto)
    async actualizarContrasenaAdmin(@Args('datos') datos: CambioContrsenaDto, @Args('modificadoPor') modificadoPor: ModificadoPorDto): Promise<EmpleadoDto>
    {
        return await this.authService.actualizarContrasenaAdmin(datos, modificadoPor);
    }

    @Mutation(() => LoginRespuestaDto, {nullable: true})
    @UseGuards(GqlAuthGuard)
    login(@Args('login') login: LoginDto, @Context() context): LoginRespuestaDto
    {
        return this.authService.login(context.user);
    }

    @Mutation(() => LoginRespuestaDto)
    async actualizarAvatar(@Args('_id') _id: string, @Args('url') url: string): Promise<LoginRespuestaDto>
    {
        return await this.authService.actualizarAvatar(_id, url);
    }

    @Subscription(() => LoginRespuestaDto, {
        filter: (payload, variables) => payload.datosSesion._id.toString() === variables._id, resolve: value => value
    })
    rolCambiado(@Args('_id') _id: string): AsyncIterator<LoginRespuestaDto>
    {
        return subRoles.asyncIterator('rolCambiado');
    }
}
