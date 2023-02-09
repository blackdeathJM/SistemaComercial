import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports:
        [
            HttpClientModule
        ],
    // providers: [
    //     AuthService,
    //     {
    //         provide : HTTP_INTERCEPTORS,
    //         useClass: AuthInterceptor,
    //         multi   : true
    //     }
    // ]
})
export class AuthModule
{
}
