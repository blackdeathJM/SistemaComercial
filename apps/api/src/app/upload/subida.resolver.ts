import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {SubirArchivosService} from './subir-archivos.service';
import {UploadDto} from '#api/libs/models/src/lib/upload/upload.dto';

@Resolver()
export class SubidaResolver
{
    constructor(private subirArchivoService: SubirArchivosService)
    {
    }

    @Mutation(() => [String])
    async subirArchivo(@Args('files') files: UploadDto): Promise<string[]>
    {
        return await this.subirArchivoService.subirArchivos(files);
    }
}
