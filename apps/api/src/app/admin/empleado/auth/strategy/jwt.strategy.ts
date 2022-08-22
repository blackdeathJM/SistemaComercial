import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from '../auth.service';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(private readonly authService: AuthService, private configService: ConfigService)
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('palabraSecreta')
        });
    }

    async validate(payload: any): Promise<{ _id: string; usuario: string }>
    {
        return {_id: payload._id, usuario: payload.usuario};
    }
}
