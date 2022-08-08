import {Query, Resolver} from '@nestjs/graphql';
import {Depto} from './DTO/depto.dto';
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
}
