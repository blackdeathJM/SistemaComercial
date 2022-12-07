import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

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
