import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {environment} from '@api-environments:/environment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor()
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // secretOrKey: configService.get('palabraSecreta')
            secretOrKey: environment.palabraSecreta
        });
    }

    async validate(payload: any): Promise<{ _id: string; usuario: string }>
    {
        return {_id: payload._id, usuario: payload.usuario};
    }
}
