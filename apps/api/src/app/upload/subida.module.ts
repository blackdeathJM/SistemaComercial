import {Module} from '@nestjs/common';
import {SubidaResolver} from './subida.resolver';

@Module({
    providers: [SubidaResolver]
})
export class SubidaModule
{
}
