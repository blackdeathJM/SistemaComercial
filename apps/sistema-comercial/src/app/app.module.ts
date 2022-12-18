import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExtraOptions, PreloadAllModules, RouterModule} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {CommonModule} from '@angular/common';
import {ApolloConfigModule} from '@s-apollo/apollo-config.module';
import {JwtModule} from '@auth0/angular-jwt';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {LuxonModule} from 'luxon-angular';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatLuxonDateModule} from '@angular/material-luxon-adapter';
import {AppComponent} from '#/apps/sistema-comercial/src/app/app.component';
import {TOKEN} from '@s-auth/const';
import {appRoutes} from '#/apps/sistema-comercial/src/app/app.routing';
import {FuseModule} from '#/apps/sistema-comercial/src/@fuse';
import {FuseConfigModule} from '@s-fuse/config';
import {FuseMockApiModule} from '@s-fuse/mock-api';
import {appConfig} from '@s-core/config/app.config';
import {mockApiServices} from '#/apps/sistema-comercial/src/app/mock-api';
import {CoreModule} from '@s-core/core.module';
import {LayoutModule} from '@s-layout/layout.module';
import {NgxsGlobalModule} from '#/apps/sistema-comercial/src/ngxs/ngxsGlobal.module';
import {StateAuth} from '@s-core/auth/auth.store';

const routerConfig: ExtraOptions =
    {
        preloadingStrategy: PreloadAllModules,
        scrollPositionRestoration: 'enabled'
    };

@NgModule({
    declarations:
        [
            AppComponent
        ],
    imports:
        [
            BrowserModule,
            HttpClientModule,
            JwtModule.forRoot({
                config: {
                    tokenGetter: () => localStorage.getItem(TOKEN),
                    skipWhenExpired: false,
                }
            }),
            CommonModule,
            FormsModule,
            LuxonModule,
            ReactiveFormsModule,
            BrowserAnimationsModule,
            NgxsGlobalModule,
            RouterModule.forRoot(appRoutes, routerConfig),

            // Fuse, FuseConfig & FuseMockAPI
            FuseModule,
            FuseConfigModule.forRoot(appConfig),
            FuseMockApiModule.forRoot(mockApiServices),

            // Core module of your application
            CoreModule,

            // Layout module of your application
            LayoutModule,

            // 3rd party modules that require global configuration via forRoot
            MarkdownModule.forRoot({}),
            ApolloConfigModule,
            SweetAlert2Module.forRoot(),
            ToastrModule.forRoot(),
            NgxTrimDirectiveModule,
            MatLuxonDateModule,
            // modulos
            provideFirebaseApp(() => initializeApp(environment.firebase)),
            provideStorage(() => getStorage()),
        ],
    providers: [{provide: MAT_DATE_LOCALE, useValue: 'es-MX'}],
    bootstrap:
        [
            AppComponent
        ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule
{
    constructor(stateAuth: StateAuth)
    {
        console.log('constructor AppModule');
        stateAuth.validarSesion();
    }
}
