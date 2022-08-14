import {Args, Context, Mutation, Resolver} from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {AuthDto, EmpleadoDto, IEmpleado, LoginDto} from '@sistema-comercial/models';
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
    async asignarAuth(@Args('auth') auth: AuthDto): Promise<IEmpleado | HttpException>
    {
        return await this.authService.asignarAuth(auth);
    }

    @Mutation(() => LoginRespuesta)
    @UseGuards(GqlAuthGuard)
    login(@Args('login') login: LoginDto, @Context() context): LoginRespuesta
    {
        return this.authService.login(context);
    }

}
