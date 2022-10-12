import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {ConfigService} from "@nestjs/config";
import {EmpleadoService} from "@api-admin/empleado.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(configService: ConfigService, private empleadoService: EmpleadoService)
    {
        super({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), ignoreExpiration: false, secretOrKey: configService.get('PALABRA_SECRETA')});
    }

    async validate(payload: any): Promise<{ _id: string; usuario: string }>
    {
        console.log('jwt-strategy', payload)
        return {_id: payload._id, usuario: payload.usuario};
    }
}
