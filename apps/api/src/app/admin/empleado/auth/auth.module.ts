import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {JwtModule} from '@nestjs/jwt';
import {AuthService} from './auth.service';
import {AuthResolver} from './auth.resolver';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {LocalStrategy} from './strategy/local.strategy';
import {JwtStrategy} from './strategy/jwt.strategy';
import {EmpleadoDto, SCHEMA_EMPLEADO} from '#api/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.dto';
import {PassportModule} from '@nestjs/passport';
import {EmpleadoService} from '#api/apps/api/src/app/dir-admon-finanzas/recursos-humanos/empleado/empleado.service';
import {RolesDto, SCHEMA_ROLES} from '#api/libs/models/src/lib/admin/empleado/auth/roles.dto';
import {RolesService} from '@api-admin/roles/roles.service';
import {RolesResolver} from '@api-admin/roles/roles.resolver';

@Module({
    imports:
        [
            MongooseModule.forFeature([
                {name: EmpleadoDto.name, schema: SCHEMA_EMPLEADO}, {name: RolesDto.name, schema: SCHEMA_ROLES}
            ]),
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
    providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy, EmpleadoService, RolesService, RolesResolver]
})
export class AuthModule
{
}
