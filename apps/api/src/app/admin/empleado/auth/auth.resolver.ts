import {Args, Context, Mutation, Resolver, Subscription} from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from './guards/gql-auth.guard';
import {PubSub} from 'graphql-subscriptions';
import {EmpleadoDto} from '#api/libs/models/src/lib/admin/empleado/empleado.dto';
import {AuthDto} from '#api/libs/models/src/lib/admin/empleado/auth/auth.dto';
import {CambioContrsenaDto} from '#api/libs/models/src/lib/admin/empleado/auth/auth.input.dto';
import {DatosSesionDto, ILoginRespuesta, LoginDto, LoginRespuestaDto} from '#api/libs/models/src/lib/admin/empleado/auth/login.dto';
import {ModificadoPorDto} from '#api/libs/models/src/lib/common/common.dto';

@Resolver(() => AuthDto)
export class AuthResolver
{
    #pubSub: PubSub;

    constructor(private authService: AuthService)
    {
        this.#pubSub = new PubSub();
    }

    @Mutation(() => EmpleadoDto)
    async asignarAuth(@Args('_id') _id: string, @Args('auth') auth: AuthDto, @Args('modificadoPor') modificadoPor: ModificadoPorDto): Promise<EmpleadoDto>
    {
        return await this.authService.asignarAuth(_id, auth, modificadoPor);
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

    @Mutation(() => DatosSesionDto)
    async validarToken(@Args('token') token: string): Promise<DatosSesionDto>
    {
        return await this.authService.validarToken(token);
    }

    // @Mutation(() => EmpleadoDto)
    // async actualizarRol(@Args('_id') _id: string, @Args('rol') rol: RolDto, @Args('modificadoPor') modificadoPor: ModificadoDto): Promise<IEmpleado | NotFoundException>
    // {
    //     const rolCambiado = await this.authService.actualizarRol(_id, rol, modificadoPor);
    //     await this.#pubSub.publish('rolCambiado', this.authService.login(rolCambiado));
    //     return rolCambiado;
    // }

    @Subscription(() => LoginRespuestaDto, {
        filter: (payload, variables) => payload.datosSesion._id.toString() === variables._id, resolve: value => value
    })
    rolCambiado(@Args('_id') _id: string): AsyncIterator<ILoginRespuesta>
    {
        return this.#pubSub.asyncIterator('rolCambiado');
    }
}
