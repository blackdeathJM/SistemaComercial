import {Module} from '@nestjs/common';
import {PlaneacionModule} from '#api/apps/api/src/app/dir-general/planeacion/planeacion.module';

@Module({
    imports: [PlaneacionModule],
    providers: []
})
export class DirGeneralModule
{
}
