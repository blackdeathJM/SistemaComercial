import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {AuthService} from '../auth.service';
import {IEmpleado} from '#api/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy)
{
    constructor(private readonly authService: AuthService)
    {
        super({usernameField: 'usuario', passwordField: 'contrasena'});
    }

    async validate(usarname: string, password: string): Promise<IEmpleado>
    {
        const empleado = await this.authService.validarUsuario(usarname, password);
        if (!empleado)
        {
            throw new UnauthorizedException('No estas autorizado');
        }
        return empleado;
    }
}
