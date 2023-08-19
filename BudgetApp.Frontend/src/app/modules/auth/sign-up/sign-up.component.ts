import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    styles: [`
        .lottie {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `]
})
export class AuthSignUpComponent implements OnInit, OnDestroy {
    @ViewChild('signUpNgForm') public signUpNgForm: NgForm;

    public _unsubscribeAll: Subject<null>;
    public loading: boolean;
    public passwordRegex: RegExp;
    public signUpForm: FormGroup;
    public usernameForm: FormGroup;
    public showAlert: boolean;
    public usernameAvailable: boolean;
    public title: string;

    public alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };

    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {
        this.showAlert = false;
        this.passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
        this.usernameAvailable = false;
        this._unsubscribeAll = new Subject();

        this.title = "Enter your email address";
    };

    ngOnInit(): void {
        this.initUserForm();
        this.initForm();
    };

    public initForm() {
        this.signUpForm = this._formBuilder.group({
            name: ['', Validators.required],
            lastName: ['', Validators.required],
            displayName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
            passwordMatch: ['', Validators.required],
            terms: [false, Validators.requiredTrue]
        },
            {
                validators: [this.matchPassword('password', 'passwordMatch')]
            });
    };

    public initUserForm() {
        this.usernameForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    };

    public signUp(): void {
        if (this.signUpForm.invalid) return this.signUpForm.markAllAsTouched();

        this._authService.signUp(this.signUpForm.value).pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
                next: (res) => {
                    console.log('RES', res);
                },
                error: (err) => {
                    console.log(err);
                }
            });
    };

    public verifyMail() {
        if (this.usernameForm.invalid) return this.usernameForm.markAllAsTouched();

        this._authService.verifyEmail(this.usernameForm.value).pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
                next: (status) => {
                    const { email } = this.usernameForm.getRawValue();

                    this.title = "Sign up";
                    this.usernameAvailable = true;

                    this.signUpForm.controls.email.patchValue(email);
                },
                error: (error: HttpErrorResponse) => {
                    if (error.status == 403) {
                        console.log("Email already in use");
                    };
                }
            });
    };

    private matchPassword(passwordControl: string, passwordMatchControl: string) {
        return (formGroup: FormGroup) => {
            const password = formGroup.controls[passwordControl];
            const passwordMatch = formGroup.controls[passwordMatchControl];

            if (passwordMatch.errors && !passwordMatch.errors.MustMatch) return;

            (password.value != passwordMatch.value) ? passwordMatch.setErrors({ mustMatch: true }) : passwordMatch.setErrors(null);
        };
    };

    public invalidControl(control: string) {
        return this.signUpForm.controls[control].errors && this.signUpForm.controls[control].touched;
    };

    public get f() {
        return this.signUpForm.controls;
    };

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    };
};
