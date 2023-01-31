import {Module} from '@nestjs/common';
import {RecursosHumanosModule} from '#api/apps/api/src/app/dir-admon-finanzas/recursos-humanos/recursos-humanos.module';

@Module({
    imports: [RecursosHumanosModule]
})
export class DirAdmonFinanzasModule
{

}
