import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {DeptosResolver} from './deptos.resolver';
import {DeptosService} from './deptos.service';
import {DEPTO_SCHEMA, DeptoDto} from '@sistema-comercial/modelos/depto.dto';

@Module({
    imports: [MongooseModule.forFeature([{name: DeptoDto.name, schema: DEPTO_SCHEMA}])],
    providers: [DeptosResolver, DeptosService]
})
export class DeptosModule
{
}
