import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {JwtModule} from '@nestjs/jwt';
import {AuthService} from './auth.service';
import {AuthResolver} from './auth.resolver';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {LocalStrategy} from './strategy/local.strategy';
import {JwtStrategy} from './strategy/jwt.strategy';
import {SCHEMA_EMPLEADO, EmpleadoDto} from '@sistema-comercial/modelos/empleado.dto';

@Module({
    imports:
        [
            MongooseModule.forFeature([{name: EmpleadoDto.name, schema: SCHEMA_EMPLEADO}]),
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
