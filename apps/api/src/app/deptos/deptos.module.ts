import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Depto, DEPTO_SCHEMA} from '@lib-common';
import {DeptoResolver} from './depto.resolver';
import {DeptosService} from './deptos.service';

@Module({
    imports: [MongooseModule.forFeature([{name: Depto.name, schema: DEPTO_SCHEMA}])],
    providers: [DeptoResolver, DeptosService]
})
export class DeptosModule
{
}
