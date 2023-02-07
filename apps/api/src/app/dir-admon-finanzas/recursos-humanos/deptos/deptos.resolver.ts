import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {DeptosService} from './deptos.service';
import {DeptoDto, RegPuestoDto} from '#api/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.dto';
import {ErroresDto} from "#api/libs/models/src/lib/errors/errores.dto";
import {Error} from "mongoose";

@Resolver(() => DeptoDto)
export class DeptosResolver
{
    constructor(private deptosService: DeptosService)
    {
    }

    @Query(() => [DeptoDto])
    // @UseGuards(JwtAuthGuard)
    async deptos(): Promise<DeptoDto[]>
    {
        return await this.deptosService.deptos();
    }

    @Query(() => [DeptoDto])
    async filtrarDeptos(@Args('nombre') nombre: string): Promise<DeptoDto[]>
    {
        return await this.deptosService.filtrarDeptos(nombre);
    }

    // async crearDepto(@Args('input', PruebaPipe) input: DeptoDto): Promise<IDepto>
    // async crearDepto(@Args('input', new PruebaPipe()) input: DeptoDto): Promise<IDepto>
    // @UsePipes(new PruebaPipe())
    @Mutation(() => DeptoDto)
    async crearDepto(@Args('input') input: DeptoDto): Promise<DeptoDto>
    {
        return await this.deptosService.crearDepto(input);
    }

    @Mutation(() => DeptoDto)
    async actualizarDepto(@Args('input') input: DeptoDto): Promise<DeptoDto>
    {
        return await this.deptosService.actualizarDepto(input);
    }

    @Mutation(() => DeptoDto)
    async eliminarDepto(@Args('_id') _id: string): Promise<DeptoDto>
    {
        return await this.deptosService.eliminarDepto(_id);
    }

    @Mutation(() => DeptoDto)
    async agregarPuesto(@Args('puesto') puesto: RegPuestoDto): Promise<DeptoDto>
    {
        return await this.deptosService.agregarPuesto(puesto);
    }
}
