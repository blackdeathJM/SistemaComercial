import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {ConfigService} from '@nestjs/config';
import {EmpleadoService} from '#api/apps/api/src/app/dir-admon-finanzas/recursos-humanos/empleado/empleado.service';
import {VariablesEntorno} from "#api/apps/api/src/config/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(configService: ConfigService, private empleadoService: EmpleadoService)
    {
        super({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), ignoreExpiration: false, secretOrKey: configService.get(VariablesEntorno.palabraJwt)});
    }

    async validate(payload: any): Promise<{ _id: string; usuario: string }>
    {
        await this.empleadoService.validarUsuarioActivo(payload._id);
        return {_id: payload._id, usuario: payload.usuario};
    }
}
