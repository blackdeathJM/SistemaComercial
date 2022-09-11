import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {UploadDto} from '@sistema-comercial/modelos/upload.dto';
import {SubirArchivosService} from './subir-archivos.service';

@Resolver()
export class SubidaResolver
{
    constructor(private subirArchivoService: SubirArchivosService)
    {
    }

    // @Mutation(() => Boolean, {nullable: true})
    // async uploadArchivo(@Args({name: 'file', type: () => GraphQLUpload}) {createReadStream, filename},
    //                     @Args('carpeta') carpeta: string, @Args('guardarLocal') guardarLocal: boolean): Promise<boolean>
    // {
    //     if (carpeta)
    //     {
    //         if (guardarLocal)
    //         {
    //         }
    //     }
    //     return new Promise(async (resolve, reject) =>
    //         createReadStream()
    //             .pipe(createWriteStream(`./uploads/${filename}`))
    //             .on('finish', () => resolve(true))
    //             .on('error', () => reject(false)));
    // }

    @Mutation(() => [String])
    async subirArchivo(@Args('files') files: UploadDto): Promise<string[]>
    {
        return await this.subirArchivoService.subirArchivos(files);
    }
}
