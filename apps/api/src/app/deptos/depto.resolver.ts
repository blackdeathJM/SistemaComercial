import {Query, Resolver} from '@nestjs/graphql';
import {Depto} from '@lib-common';

@Resolver()
export class DeptoResolver
{
    @Query(() => [Depto])
    async deptos(): Promise<Depto[]>
    {
        return [];
    }
}
