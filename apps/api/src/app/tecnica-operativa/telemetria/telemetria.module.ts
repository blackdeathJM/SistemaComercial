import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {SCHEMA_TELEMETRIA, TelemetriaDto} from '#api/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.dto';
import {TelemetriaService} from '#api/apps/api/src/app/tecnica-operativa/telemetria/telemetria.service';
import {TelemetriaResolver} from '#api/apps/api/src/app/tecnica-operativa/telemetria/telemetria.resolver';

@Module({
    imports: [MongooseModule.forFeature([{name: TelemetriaDto.name, schema: SCHEMA_TELEMETRIA}])],
    providers: [TelemetriaService, TelemetriaResolver]
})
export class TelemetriaModule
{
}
