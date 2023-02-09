import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, of, tap} from 'rxjs';
import {fuseAnimations} from '@s-fuse/public-api';
import {FuseAlertType} from '@s-fuse/alert';
import {AuthService} from '@s-core/auth/store/auth.service';

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

    constructor(private _activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder, private _router: Router, private authService: AuthService)
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
        this.authService.login(this.signInForm.value).pipe(catchError(() =>
        {
            this.signInForm.enable();
            this.signInNgForm.resetForm();
            this.alert = {
                type: 'error',
                message: 'Los datos proporcionados no son correctos'
            };
            this.showAlert = true;
            return of(null);
        })).subscribe();
    }
}
