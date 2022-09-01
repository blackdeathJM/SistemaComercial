import {Module} from '@nestjs/common';
import {EmpleadoService} from './empleado.service';
import {EmpleadoResolver} from './empleado.resolver';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from './auth/auth.module';
import {DeptosService} from '../deptos/deptos.service';
import {DEPTO_SCHEMA, DeptoDto} from '@sistema-comercial/modelos/depto.dto';
import {EMPLEADO_SCHEMA, EmpleadoDto} from '@sistema-comercial/modelos/empleado.dto';

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
