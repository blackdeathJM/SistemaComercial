import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from '@s-app/core/auth/auth.service';
import {AuthInterceptor} from '@s-app/core/auth/auth.interceptor';
import {JwtHelperService} from '@auth0/angular-jwt';

@NgModule({
    imports:
        [
            HttpClientModule
        ],
    providers: [AuthService, JwtHelperService]
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
