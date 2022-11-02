import {Module} from '@nestjs/common';
import {SubirArchivosService} from './subir-archivos.service';

@Module({
    providers: [SubirArchivosService]
})
export class SubirArchivoModule
{
}
