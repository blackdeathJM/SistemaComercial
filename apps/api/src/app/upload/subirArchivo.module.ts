import {Module} from '@nestjs/common';
import {SubirArchivosService} from './subir-archivos.service';

@Module({
    providers: [SubirArchivosService],
    exports: [SubirArchivosService]
})
export class SubirArchivoModule
{
}
