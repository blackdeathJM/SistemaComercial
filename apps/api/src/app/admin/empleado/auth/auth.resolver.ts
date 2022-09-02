import {Args, Context, Mutation, Resolver, Subscription} from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {HttpException, NotFoundException, UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from './guards/gql-auth.guard';
import {AuthDto, RolDto} from '@sistema-comercial/modelos/auth.dto';
import {EmpleadoDto, ModificadoDto} from '@sistema-comercial/modelos/empleado.dto';
import {ILoginRespuesta, LoginDto, LoginRespuestaDto} from '@sistema-comercial/modelos/login.dto';
import {CambioContrsenaDto} from '@sistema-comercial/modelos/auth.input.dto';
import {IEmpleado} from '@sistema-comercial/modelos/empleado.interface';
import {PubSub} from 'graphql-subscriptions';

@Resolver(() => AuthDto)
export class AuthResolver
{
    #pubSub: PubSub;

    constructor(private authService: AuthService)
    {
        this.#pubSub = new PubSub();
    }

    @Mutation(() => EmpleadoDto)
    async asignarAuth(@Args('_id') _id: string, @Args('auth') auth: AuthDto): Promise<IEmpleado | HttpException>
    {
        return await this.authService.asignarAuth(_id, auth);
    }

    @Mutation(() => EmpleadoDto)
    async actualizarContrasenaAdmin(@Args('datos') datos: CambioContrsenaDto): Promise<IEmpleado | NotFoundException>
    {
        return await this.authService.actualizarContrasenaAdmin(datos);
    }

    @Mutation(() => LoginRespuestaDto, {nullable: true})
    @UseGuards(GqlAuthGuard)
    login(@Args('login') login: LoginDto, @Context() context): ILoginRespuesta
    {
        return this.authService.login(context.user);
    }

    @Mutation(() => EmpleadoDto)
    async actualizarRol(@Args('_id') _id: string, @Args('rol') rol: RolDto, @Args('modificadoPor') modificadoPor: ModificadoDto): Promise<IEmpleado | NotFoundException>
    {
        const rolCambiado = await this.authService.actualizarRol(_id, rol, modificadoPor);
        await this.#pubSub.publish('rolCambiado', this.authService.login(rolCambiado));
        return rolCambiado;
    }

    @Subscription(() => LoginRespuestaDto, {
        filter: (payload, variables) => payload.datosSesion._id.toString() === variables._id, resolve: value => value
    })
    rolCambiado(@Args('_id') _id: string): AsyncIterator<ILoginRespuesta>
    {
        return this.#pubSub.asyncIterator('rolCambiado');
    }
}
