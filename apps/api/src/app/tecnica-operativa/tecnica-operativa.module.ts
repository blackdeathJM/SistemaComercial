import {Module} from '@nestjs/common';
import {TelemetriaModule} from '#api/apps/api/src/app/tecnica-operativa/telemetria/telemetria.module';

@Module({
    imports: [TelemetriaModule]
})
export class TecnicaOperativaModule
{
}
