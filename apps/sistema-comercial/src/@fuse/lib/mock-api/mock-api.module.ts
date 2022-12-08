import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {FuseMockApiInterceptor} from '@s-fuse/mock-api/mock-api.interceptor';
import {FUSE_MOCK_API_DEFAULT_DELAY} from '@s-fuse/mock-api/mock-api.constants';

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: FuseMockApiInterceptor,
            multi: true
        }
    ]
})
export class FuseMockApiModule
{
    static forRoot(mockApiServices: any[], config?: { delay?: number }): ModuleWithProviders<FuseMockApiModule>
    {
        return {
            ngModule: FuseMockApiModule,
            providers:
                [
                    {
                        provide: APP_INITIALIZER,
                        deps: [...mockApiServices],
                        useFactory: () => (): any => null,
                        multi: true
                    },
                    {
                        provide: FUSE_MOCK_API_DEFAULT_DELAY,
                        useValue: config?.delay ?? 0
                    }
                ]
        };
    }
}
