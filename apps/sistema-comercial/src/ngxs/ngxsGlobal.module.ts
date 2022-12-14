import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {environment} from '@s-environments/environment';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {StateDeptoStore} from '@s-admin/state-depto.store';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {NGXS_DATA_STORAGE_PLUGIN} from '@angular-ru/ngxs/storage';
import {StateAuth} from '@s-core/auth/auth.store';

@NgModule({
    imports:
        [
            NgxsModule.forRoot([StateDeptoStore, StateAuth], {
                developmentMode: !environment.production
            }),
            NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN]),
            NgxsLoggerPluginModule.forRoot(),
            NgxsReduxDevtoolsPluginModule.forRoot()
        ]
})
export class NgxsGlobalModule
{
}
