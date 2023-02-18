import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ActInstDto, AgregarBombaDto, AgregarMotorDto, RegInstalacionDto, TelemetriaDto, unionTele} from '#api/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.dto';
import {TelemetriaService} from '#api/apps/api/src/app/tecnica-operativa/telemetria/telemetria.service';
import {TomarMedicionDto} from '#api/libs/models/src/lib/tecnica-operativa/telemetria/instalacion/instalacion.dto';

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

    @Mutation(() => unionTele)
    async crearRegLectura(@Args('args') args: TomarMedicionDto): Promise<typeof unionTele>
    {
        return await this.telemetriaService.crearRegLectura(args);
    }

    @Mutation(() => TelemetriaDto)
    async actLectura(@Args('args') args: TomarMedicionDto): Promise<TelemetriaDto>
    {
        return await this.telemetriaService.actLectura(args);
    }

    @Mutation(() => unionTele)
    async regInstalacion(@Args('datos') datos: RegInstalacionDto): Promise<typeof unionTele>
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
