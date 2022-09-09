import {Module} from '@nestjs/common';
import {EmpleadoService} from './empleado.service';
import {EmpleadoResolver} from './empleado.resolver';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from './auth/auth.module';
import {DeptosService} from '../deptos/deptos.service';
import {SCHEMA_DEPTO, DeptoDto} from '@sistema-comercial/modelos/depto.dto';
import {SCHEMA_EMPLEADO, EmpleadoDto} from '@sistema-comercial/modelos/empleado.dto';

@Module({
    imports: [MongooseModule.forFeature([
        {name: EmpleadoDto.name, schema: SCHEMA_EMPLEADO},
        {name: DeptoDto.name, schema: SCHEMA_DEPTO}
    ]), AuthModule],
    providers: [EmpleadoService, EmpleadoResolver, DeptosService]
})
export class EmpleadoModule
{
}
