import {Module} from '@nestjs/common';
import {EmpleadoService} from './empleado.service';
import {EmpleadoResolver} from './empleado.resolver';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from '@api-admin/auth.module';
import {DeptosService} from '@api-dir-admon-finanzas/deptos.service';
import {EmpleadoDto, SCHEMA_EMPLEADO} from '#api/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.dto';
import {DeptoDto, SCHEMA_DEPTO} from '#api/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.dto';

@Module({
    imports: [MongooseModule.forFeature([
        {name: EmpleadoDto.name, schema: SCHEMA_EMPLEADO},
        {name: DeptoDto.name, schema: SCHEMA_DEPTO},
    ]), AuthModule],
    exports: [EmpleadoService],
    providers: [EmpleadoService, EmpleadoResolver, DeptosService],
})
export class EmpleadoModule
{
}
