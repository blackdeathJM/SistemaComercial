import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExtraOptions, PreloadAllModules, RouterModule} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';
import {FuseConfigModule} from '@s-fuse/services/config';
import {FuseMockApiModule} from '@s-fuse/lib/mock-api';
import {CoreModule} from '@s-app/core/core.module';
import {appConfig} from '@s-app/core/config/app.config';
import {mockApiServices} from '@s-app/mock-api';
import {LayoutModule} from '@s-app/layout/layout.module';
import {AppComponent} from '@s-app/app.component';
import {appRoutes} from '@s-app/app.routing';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {DeptosModule} from '@s-app/modules/admin/deptos/deptos.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {ToastrModule} from 'ngx-toastr';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {FuseModule} from '@s-fuse/fuse.module';
import {CommonModule} from '@angular/common';
import {ApolloConfigModule} from '@s-apollo/apollo-config.module';
import {JwtModule} from '@auth0/angular-jwt';
import {TOKEN} from '@s-app/auth/const';

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
            ReactiveFormsModule,
            RxReactiveFormsModule,
            BrowserAnimationsModule,
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
            NgxSkeletonLoaderModule.forRoot(),
            SweetAlert2Module.forRoot(),
            ToastrModule.forRoot(),
            NgxTrimDirectiveModule,
            // modulos
            DeptosModule,
        ],
    bootstrap:
        [
            AppComponent
        ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule
{
}
