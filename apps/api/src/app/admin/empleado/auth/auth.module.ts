import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {JwtModule} from '@nestjs/jwt';
import {AuthService} from './auth.service';
import {AuthResolver} from './auth.resolver';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {LocalStrategy} from './strategy/local.strategy';
import {JwtStrategy} from './strategy/jwt.strategy';
import {EmpleadoDto, SCHEMA_EMPLEADO} from '#api/libs/models/src/lib/admin/empleado/empleado.dto';
import {PassportModule} from "@nestjs/passport";
import {EmpleadoService} from "@api-admin/empleado.service";

@Module({
    imports:
        [
            MongooseModule.forFeature([{name: EmpleadoDto.name, schema: SCHEMA_EMPLEADO}]),
            PassportModule.register({defaultStrategy: 'jwt'}),
            JwtModule.registerAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: async (configService: ConfigService) => ({
                    secret: configService.get('PALABRA_SECRETA'),
                    signOptions: {expiresIn: '8h'}
                })
            }),
        ],
    providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy, EmpleadoService]
})
export class AuthModule
{
}
