import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {DeptoDto} from '@sistema-comercial/models';
import {DeptosService} from './deptos.service';
import {IDepto} from '@sistema-comercial/models';

@Resolver(() => DeptoDto)
export class DeptosResolver
{
    constructor(private deptosService: DeptosService)
    {
    }

    @Query(() => [DeptoDto])
    async deptos(): Promise<IDepto[]>
    {
        return this.deptosService.deptos();
    }

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
