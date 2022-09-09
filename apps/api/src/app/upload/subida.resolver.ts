import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {createWriteStream} from 'fs';
import {UploadDto} from '@sistema-comercial/modelos/upload.dto';

@Resolver()
export class SubidaResolver
{
    // @Mutation(() => Boolean, {nullable: true})
    // async uploadFile(@Args({name: 'file', type: () => GraphQLUpload}) {createReadStream, filename}): Promise<boolean>
    // {
    //     return new Promise(async (resolve, reject) =>
    //         createReadStream()
    //             .pipe(createWriteStream(`./uploads/${filename}`))
    //             .on('finish', () => resolve(true))
    //             .on('error', () => reject(false)));
    // }

    @Mutation(() => Boolean)
    async subirArchivo(@Args('archivo') archivo: UploadDto): Promise<boolean>
    {
        const respuesta = await archivo.archivo;
        console.log('archivo recibido', respuesta);
        return true;
    }
}
