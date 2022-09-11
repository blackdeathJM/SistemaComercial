import {Module} from '@nestjs/common';
import {SubidaResolver} from './subida.resolver';
import { SubirArchivosService } from './subir-archivos.service';

@Module({
    providers: [SubidaResolver, SubirArchivosService]
})
export class SubirArchivoModule
{
}
