import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DepartamentosGQL, LoginGQL} from '#/libs/datos/src';
import {catchError, of, Subscription, tap} from 'rxjs';
import {fuseAnimations} from '@s-fuse/public-api';
import {FuseAlertType} from '@s-fuse/alert';
import {AuthService} from '@s-core/auth/auth.service';
import {TOKEN} from '@s-auth/const';
import {STATE_DATOS_SESION} from '@s-core/auth/auth.state';
import {StateAuth} from '@s-core/auth/auth.store';

@Component({
    selector: 'auth.ts-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignInComponent implements OnInit, OnDestroy
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    subs: Subscription = new Subscription();

    constructor(private _activatedRoute: ActivatedRoute, private _authService: AuthService, private _formBuilder: FormBuilder, private _router: Router,
                private loginGQL: LoginGQL, private stateAuth: StateAuth)
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
        this.subs.add(this.loginGQL.mutate({login: this.signInForm.value}).pipe(catchError((err) =>
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
            if (res.data !== undefined)
            {
                if (res.data)
                {
                    STATE_DATOS_SESION(res.data.login.datosSesion);
                    this.stateAuth.login(res.data.login, res.data.token);
                    localStorage.setItem(TOKEN, res.data.login.token);
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/redireccionar';
                    this._router.navigateByUrl(redirectURL).then().catch(err => console.log('error', err));
                }
            }
        })).subscribe());
    }

    ngOnDestroy(): void
    {
        this.subs.unsubscribe();
    }
}
