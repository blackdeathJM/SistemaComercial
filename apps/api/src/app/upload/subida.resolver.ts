import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {UploadDto} from '@sistema-comercial/modelos/upload.dto';

@Resolver()
export class SubidaResolver
{
    // @Mutation(() => Boolean, {nullable: true})
    // async uploadArchivo(@Args({name: 'file', type: () => GraphQLUpload}) {createReadStream, filename}): Promise<boolean>
    // {
    //     return new Promise(async (resolve, reject) =>
    //         createReadStream()
    //             .pipe(createWriteStream(`./uploads/${filename}`))
    //             .on('finish', () => resolve(true))
    //             .on('error', () => reject(false)));
    // }

    @Mutation(() => Boolean)
    async subirArchivo(@Args('file') file: UploadDto): Promise<boolean>
    {
        const respuesta = await file;
        console.log('archivo recibido', respuesta);
        return true;
    }
}
