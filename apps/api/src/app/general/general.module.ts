import {Module} from '@nestjs/common';
import {DocumentosModule} from './documentos/documentos.module';

@Module({
    imports:
        [
            DocumentosModule
        ],
})
export class GeneralModule
{
}
