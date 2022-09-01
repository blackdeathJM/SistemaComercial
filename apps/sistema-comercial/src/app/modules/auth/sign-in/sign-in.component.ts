import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {fuseAnimations} from '@s-fuse/animations';
import {FuseAlertType} from '@s-fuse/components/alert';
import {AuthService} from '@s-app/core/auth/auth.service';
import {LoginGQL} from '#/libs/datos/src';
import {catchError, of, tap} from 'rxjs';
import {STATE_DATOS_SESION} from '@s-app/auth/auth.state';

@Component({
    selector: 'auth.ts-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;

    constructor(private _activatedRoute: ActivatedRoute, private _authService: AuthService, private _formBuilder: FormBuilder, private _router: Router,
                private loginGQL: LoginGQL)
    {
    }

    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            usuario: ['', [Validators.required]],
            contrasena: ['', Validators.required]
        });
    }

    signIn(): void
    {
        // Return if the form is invalid
        if (this.signInForm.invalid)
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this.loginGQL.mutate({login: this.signInForm.value}).pipe(catchError((err) =>
        {
            this.signInForm.enable();
            this.signInNgForm.resetForm();
            this.alert = {
                type: 'error',
                message: 'Los datos proporcionados no son correctos'
            };
            this.showAlert = true;
            return of(err);
        }), tap((res) =>
        {
            if (res.data.login.token)
            {
                STATE_DATOS_SESION(res.data.login.datosSesion);
                this._authService.accessToken = res.data.login.token;
                const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/redireccionar';
                this._router.navigateByUrl(redirectURL).then();
            }
        })).subscribe();
    }
}
