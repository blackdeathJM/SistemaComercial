import {Module} from '@nestjs/common';
import {DocumentosModule} from './documentos/documentos.module';
import {NotificacionesModule} from '@api-general/notificaciones/notificaciones.module';

@Module({
    imports:
        [
            DocumentosModule, NotificacionesModule
        ],
})
export class GeneralModule
{
}
