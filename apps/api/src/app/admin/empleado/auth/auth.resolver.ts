import {Args, Context, Mutation, Resolver} from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {AuthDto, CambioContrsenaDto, EmpleadoDto, IEmpleado, ILoginRespuesta, LoginDto, RolDto} from '@sistema-comercial/models';
import {LoginRespuesta} from '@sistema-comercial/models';
import {HttpException, NotFoundException, UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from './guards/gql-auth.guard';

@Resolver(() => AuthDto)
export class AuthResolver
{
    constructor(private authService: AuthService)
    {
    }

    @Mutation(() => EmpleadoDto)
    async asignarAuth(@Args('_id') _id: string, @Args('auth') auth: AuthDto): Promise<IEmpleado | HttpException>
    {
        return await this.authService.asignarAuth(_id, auth);
    }

    @Mutation(() => LoginRespuesta, {nullable: true})
    @UseGuards(GqlAuthGuard)
    login(@Args('login') login: LoginDto, @Context() context): ILoginRespuesta
    {
        return this.authService.login(context);
    }

    @Mutation(() => EmpleadoDto)
    async actualizarContrasenaAdmin(@Args('datos') datos: CambioContrsenaDto): Promise<IEmpleado | NotFoundException>
    {
        return await this.authService.actualizarContrasenaAdmin(datos);
    }

    @Mutation(() => EmpleadoDto)
    async actualizarRol(@Args('_id') _id: string, @Args('rol') rol: RolDto): Promise<IEmpleado | NotFoundException>
    {
        return await this.authService.actualizarRol(_id, rol);
    }
}
