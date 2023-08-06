import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { TokenService } from 'app/core/auth/token.service';
import { ILogin } from 'app/interfaces';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    styles: [`
        .mail-icon {
            margin-right: 6px;
        };
    `]
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    private _unsubscribeAll: Subject<null>;
    public signInForm: FormGroup;
    public showAlert: boolean = false;
    public alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _tokenService: TokenService
    ) {
        this._unsubscribeAll = new Subject();
    };

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            rememberMe: [false]
        });

        this.setCredentials(this._tokenService.getCredentials);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        if (this.signInForm.invalid) return this.signInForm.markAllAsTouched();

        this.signInForm.disable();
        this.showAlert = false;
        const { rememberMe, email } = this.signInForm.getRawValue();

        this._authService.signIn(this.signInForm.getRawValue())
            .pipe(takeUntil(this._unsubscribeAll)).subscribe({
                next: (res: ILogin) => {
                    this._tokenService.setCredentials = { rememberMe, email };

                    console.log(res);
                },
                error: (err: any) => {
                    console.log("error", err);

                    this.signInForm.enable();    
                    this.signInNgForm.resetForm();     
                    this.alert = {
                        type: 'error',
                        message: 'Wrong email or password'
                    };
                    this.showAlert = true;
                }
            });
    };

    setCredentials(creds: any) {
        if (!creds) return;

        this.signInForm.setValue({
            'email': creds.email,
            'password': "",
            'rememberMe': creds.rememberMe
        });

        this.signInForm.updateValueAndValidity();
    };
};
