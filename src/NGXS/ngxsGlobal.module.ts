import {NgModule} from '@angular/core';
import {NgxsModule, NoopNgxsExecutionStrategy} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {NGXS_DATA_STORAGE_CONTAINER, NGXS_DATA_STORAGE_EXTENSION} from '@angular-ru/ngxs/storage';


@NgModule({
    imports:
        [
            NgxsModule.forRoot([], {executionStrategy: NoopNgxsExecutionStrategy}),
            NgxsReduxDevtoolsPluginModule.forRoot(),
            NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_EXTENSION, NGXS_DATA_STORAGE_EXTENSION, NGXS_DATA_STORAGE_CONTAINER])
        ]
})
export class NgxsGlobalModule
{
}
