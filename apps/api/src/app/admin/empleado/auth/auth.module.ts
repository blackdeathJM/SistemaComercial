import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {EMPLEADO_SCHEMA, EmpleadoDto} from '@sistema-comercial/models';
import {JwtModule} from '@nestjs/jwt';
import {AuthService} from './auth.service';
import {AuthResolver} from './auth.resolver';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {LocalStrategy} from './strategy/local.strategy';
import {JwtStrategy} from './strategy/jwt.strategy';

@Module({
    imports:
        [
            MongooseModule.forFeature([{name: EmpleadoDto.name, schema: EMPLEADO_SCHEMA}]),
            JwtModule.registerAsync({
                imports: [ConfigModule],
                inject:[ConfigService],
                useFactory: async (configService: ConfigService) => ({
                    secret: configService.get('palabraSecreta'),
                    signOptions: {expiresIn: '8h'}
                })
            })
        ],
    providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy]
})
export class AuthModule
{
}