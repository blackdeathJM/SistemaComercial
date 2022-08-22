import {Module} from '@nestjs/common';
import {EmpleadoService} from './empleado.service';
import {EmpleadoResolver} from './empleado.resolver';
import {MongooseModule} from '@nestjs/mongoose';
import {DEPTO_SCHEMA, DeptoDto, EMPLEADO_SCHEMA, EmpleadoDto} from '@sistema-comercial/models';
import {AuthModule} from './auth/auth.module';
import {DeptosService} from '../deptos/deptos.service';

@Module({
    imports: [MongooseModule.forFeature([
        {name: EmpleadoDto.name, schema: EMPLEADO_SCHEMA},
        {name: DeptoDto.name, schema: DEPTO_SCHEMA}
    ]), AuthModule],
    providers: [EmpleadoService, EmpleadoResolver, DeptosService]
})
export class EmpleadoModule
{
}
