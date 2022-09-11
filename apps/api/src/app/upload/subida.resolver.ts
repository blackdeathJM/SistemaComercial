import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {UploadDto} from '@sistema-comercial/modelos/upload.dto';
import {SubirArchivosService} from './subir-archivos.service';

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
