import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {DeptosService} from './deptos.service';
import {DeptoDto} from '@sistema-comercial/modelos/depto.dto';
import {IDepto} from '@sistema-comercial/modelos/depto.interface';
import {ExceptionHandler} from "@nestjs/core/errors/exception-handler";

@Resolver(() => DeptoDto)
export class DeptosResolver
{
    constructor(private deptosService: DeptosService)
    {
    }

    @Query(() => [DeptoDto])
    // @UseGuards(JwtAuthGuard)
    async deptos(): Promise<IDepto[]>
    {
        return this.deptosService.deptos();
    }

    // async crearDepto(@Args('input', PruebaPipe) input: DeptoDto): Promise<IDepto>
    // async crearDepto(@Args('input', new PruebaPipe()) input: DeptoDto): Promise<IDepto>
    // @UsePipes(new PruebaPipe())
    @Mutation(() => DeptoDto)
    async crearDepto(@Args('input') input: DeptoDto): Promise<IDepto>
    {
        return await this.deptosService.crearDepto(input);
    }

    @Mutation(() => DeptoDto)
    async actualizarDepto(@Args('input') input: DeptoDto): Promise<IDepto>
    {
        return await this.deptosService.actualizarDepto(input);
    }

    @Mutation(() => DeptoDto)
    async eliminarDepto(@Args('_id') _id: string): Promise<IDepto>
    {
        return await this.deptosService.eliminarDepto(_id);
    }
}
