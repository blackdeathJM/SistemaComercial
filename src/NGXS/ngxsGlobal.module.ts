import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {environment} from '@environments/environment';


@NgModule({
    declarations: [],
    imports:
        [
            NgxsModule.forRoot([]),
            NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production})
        ]
})
export class NgxsGlobalModule
{
}
