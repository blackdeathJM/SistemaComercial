import {Module} from '@nestjs/common';
import {EmpleadoService} from './empleado.service';
import {EmpleadoResolver} from './empleado.resolver';
import {MongooseModule} from '@nestjs/mongoose';
import {EMPLEADO_SCHEMA, EmpleadoDto} from '@sistema-comercial/models';
import {AuthModule} from './auth/auth.module';

@Module({
    imports: [MongooseModule.forFeature([{name: EmpleadoDto.name, schema: EMPLEADO_SCHEMA}]), AuthModule],
    providers: [EmpleadoService, EmpleadoResolver]
})
export class EmpleadoModule
{
}
