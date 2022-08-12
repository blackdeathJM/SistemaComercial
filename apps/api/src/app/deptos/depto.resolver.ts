import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {Depto} from '@sistema-comercial/models';
import {DeptosService} from './deptos.service';
import {IDepto} from '@sistema-comercial/models';

@Resolver()
export class DeptoResolver
{
    constructor(private deptosService: DeptosService)
    {
    }

    @Query(() => [Depto])
    async deptos(): Promise<IDepto[]>
    {
        return this.deptosService.deptos();
    }

    @Mutation(() => Depto)
    async crearDepto(@Args('input') input: Depto): Promise<IDepto>
    {
        return await this.deptosService.crearDepto(input);
    }

    @Mutation(() => Depto)
    async actualizarDepto(@Args('input') input: Depto): Promise<IDepto>
    {
        return await this.deptosService.actualizarDepto(input);
    }

    @Mutation(() => Depto)
    async eliminarDepto(@Args('_id') _id: string): Promise<IDepto>
    {
        return await this.deptosService.eliminarDepto(_id);
    }
}
