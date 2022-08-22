import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {DeptosResolver} from './deptos.resolver';
import {DeptosService} from './deptos.service';
import {DeptoDto, DEPTO_SCHEMA} from '@sistema-comercial/models';

@Module({
    imports: [MongooseModule.forFeature([{name: DeptoDto.name, schema: DEPTO_SCHEMA}])],
    providers: [DeptosResolver, DeptosService]
})
export class DeptosModule
{
}
