import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {DeptoResolver} from './depto.resolver';
import {DeptosService} from './deptos.service';
import {Depto, DEPTO_SCHEMA} from '@sistema-comercial/models';

@Module({
    imports: [MongooseModule.forFeature([{name: Depto.name, schema: DEPTO_SCHEMA}])],
    providers: [DeptoResolver, DeptosService]
})
export class DeptosModule
{
}
