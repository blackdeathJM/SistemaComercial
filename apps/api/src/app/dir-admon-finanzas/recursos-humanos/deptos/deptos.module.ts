import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {DeptosResolver} from './deptos.resolver';
import {DeptosService} from './deptos.service';
import {DeptoDto, SCHEMA_DEPTO} from '#api/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.dto';

@Module({
    imports: [MongooseModule.forFeature([{name: DeptoDto.name, schema: SCHEMA_DEPTO}])],
    providers: [DeptosResolver, DeptosService],
    exports: [DeptosService]
})
export class DeptosModule
{
}
