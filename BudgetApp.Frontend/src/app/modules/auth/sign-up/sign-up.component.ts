import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') public signUpNgForm: NgForm;

    public loading: boolean;
    public passwordRegex: RegExp;
    public signUpForm: FormGroup;
    public showAlert: boolean = false;
    public alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };

    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {
        this.passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    };

    ngOnInit(): void {
        this.initForm();
    };

    public initForm() {
        this.signUpForm = this._formBuilder.group({
            name: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
            passwordMatch: ['', Validators.required],
            terms: [false, Validators.requiredTrue]
        },
            {
                validators: [this.matchPassword('password', 'passwordMatch')]
            });
    };

    signUp(): void {
        if (this.signUpForm.invalid) return this.signUpForm.markAllAsTouched();

        console.log(this.signUpForm.value);
    };

    matchPassword(passwordControl: string, passwordMatchControl: string) {
        return (formGroup: FormGroup) => {
            const password = formGroup.controls[passwordControl];
            const passwordMatch = formGroup.controls[passwordMatchControl];

            if (passwordMatch.errors && !passwordMatch.errors.MustMatch) return;

            (password.value != passwordMatch.value) ? passwordMatch.setErrors({ mustMatch: true }) : passwordMatch.setErrors(null);
        };
    };

    invalidControl(control: string) {
        return this.signUpForm.controls[control].errors && this.signUpForm.controls[control].touched;
    };

    get f() {
        return this.signUpForm.controls;
    };
};
