import {Mutation, Query, Resolver} from '@nestjs/graphql';
import {TelemetriaDto} from '#api/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.dto';
import {TelemetriaService} from '#api/apps/api/src/app/tecnica-operativa/telemetria/telemetria.service';

@Resolver(() => TelemetriaDto)
export class TelemetriaResolver
{
    constructor(private telemetriaService: TelemetriaService)
    {
    }

    @Query(() => [TelemetriaDto])
    async instalaciones(): Promise<TelemetriaDto[]>
    {
        return await this.telemetriaService.instalaciones();
    }
}
