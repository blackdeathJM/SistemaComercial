import {Args, Context, Mutation, Resolver} from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {AuthDto, EmpleadoDto, IEmpleado, ILoginRespuesta, LoginDto, RolDto} from '@sistema-comercial/models';
import {LoginRespuesta} from '@sistema-comercial/models';
import {HttpException, UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from './guards/gql-auth.guard';

@Resolver()
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

    @Mutation(() => EmpleadoDto)
    async asignarRol(_id: string, rol: RolDto[]): Promise<IEmpleado | HttpException>
    {

    }

    @Mutation(() => LoginRespuesta, {nullable: true})
    @UseGuards(GqlAuthGuard)
    login(@Args('login') login: LoginDto, @Context() context): ILoginRespuesta
    {
        return this.authService.login(context);
    }

}
