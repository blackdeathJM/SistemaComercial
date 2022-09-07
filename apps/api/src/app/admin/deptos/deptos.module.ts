import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {DeptosResolver} from './deptos.resolver';
import {DeptosService} from './deptos.service';
import {SCHEMA_DEPTO, DeptoDto} from '@sistema-comercial/modelos/depto.dto';
import {AppService} from '../../app.service';

@Module({
    imports: [MongooseModule.forFeature([{name: DeptoDto.name, schema: SCHEMA_DEPTO}])],
    providers: [DeptosResolver, DeptosService, AppService]
})
export class DeptosModule
{
}
