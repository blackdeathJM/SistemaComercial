import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {environment} from '@s-environments/environment';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {StateDeptoStore} from '@s-admin/state-depto.store';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';

@NgModule({
    imports:
        [
            NgxsModule.forRoot([StateDeptoStore], {
                developmentMode: !environment.production
            }),
            NgxsDataPluginModule.forRoot(),
            NgxsLoggerPluginModule.forRoot(),
            NgxsReduxDevtoolsPluginModule.forRoot()
        ]
})
export class NgxsGlobalModule
{
}
