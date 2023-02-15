import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ActInstDto, AgregarBombaDto, AgregarMotorDto, RegInstalacionDto, TelemetriaDto} from '#api/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.dto';
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

    @Mutation(() => TelemetriaDto)
    async regInstalacion(@Args('datos') datos: RegInstalacionDto): Promise<TelemetriaDto>
    {
        return this.telemetriaService.regInstalacion(datos);
    }

    @Mutation(() => TelemetriaDto)
    async actInst(@Args('args') args: ActInstDto): Promise<TelemetriaDto>
    {
        return this.telemetriaService.actInst(args);
    }

    @Mutation(() => TelemetriaDto)
    async agregarMotor(@Args('args') args: AgregarMotorDto): Promise<TelemetriaDto>
    {
        return this.telemetriaService.agregarMotor(args);
    }

    @Mutation(() => TelemetriaDto)
    async agregarBomba(@Args('args') args: AgregarBombaDto): Promise<TelemetriaDto>
    {
        return this.telemetriaService.agregarBomba(args);
    }
}
