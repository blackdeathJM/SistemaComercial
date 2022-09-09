import {Args, Mutation, Resolver} from '@nestjs/graphql';
import GraphQLUpload from 'apollo-server-express';
import {createWriteStream} from 'fs';

@Resolver()
export class SubidaResolver
{
    @Mutation(() => Boolean)
    async uploadFile(@Args({name: 'file', type: () => GraphQLUpload})
                         {
                             createReadStream,
                             filename
                         }): Promise<boolean>
    {
        return new Promise(async (resolve, reject) =>
            createReadStream()
                .pipe(createWriteStream(`./uploads/${filename}`))
                .on('finish', () => resolve(true))
                .on('error', () => reject(false))
        );
    }
}
