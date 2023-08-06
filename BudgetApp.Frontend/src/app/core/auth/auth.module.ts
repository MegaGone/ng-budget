import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthInterceptor } from 'app/core/auth/auth.interceptor';
import { TokenService } from './token.service';

@NgModule({
    imports  : [
        HttpClientModule
    ],
    providers: [
        AuthService,
        TokenService,
        {
            provide : HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi   : true
        }
    ]
})
export class AuthModule
{
}
