import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {FileUpload, GraphQLUpload} from 'graphql-upload';
import {createWriteStream} from 'fs';

@Resolver()
export class AppResolver
{
    @Mutation(() => Boolean)
    async uploadFile(@Args({name: 'file', type: () => GraphQLUpload})
                         {
                             createReadStream,
                             filename
                         }: FileUpload): Promise<boolean>
    {
        return new Promise(async (resolve, reject) =>
            createReadStream()
                .pipe(createWriteStream(`./uploads/${filename}`))
                .on('finish', () => resolve(true))
                .on('error', () => reject(false))
        );
    }
}
