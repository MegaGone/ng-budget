import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { TokenService } from 'app/core/auth/token.service';
import { ILogin } from 'app/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { OtpComponent } from './dialogs/otp/otp.component';
import { SetupOtpComponent } from './dialogs/setup-otp/setup-otp.component';
import { Router } from '@angular/router';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    styles: [`
        .mail-icon {
            margin-right: 6px;
        };

        .mat-dialog-container {
            padding: 0px !important;
        }
    `]
})
export class AuthSignInComponent implements OnInit, OnDestroy {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    private _unsubscribeAll: Subject<null>;
    public signInForm: FormGroup;
    public showAlert: boolean = false;
    public alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };

    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _tokenService: TokenService,
        private _dialog: MatDialog,
        private _router: Router
    ) {
        this._unsubscribeAll = new Subject();
    };

    ngOnInit(): void {
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            rememberMe: [false]
        });

        this.setCredentials(this._tokenService.getCredentials);
    }

    signIn(): void {
        if (this.signInForm.invalid) return this.signInForm.markAllAsTouched();

        this.signInForm.disable();
        this.showAlert = false;
        const { rememberMe, email } = this.signInForm.getRawValue();

        this._authService.signIn(this.signInForm.getRawValue())
            .pipe(takeUntil(this._unsubscribeAll)).subscribe({
                next: (res: ILogin) => {
                    this.signInForm.enable();
                    var dialogRef: MatDialogRef<OtpComponent | SetupOtpComponent>;

                    // SETUP OTP
                    if (!res.data && !res.secret) {
                        dialogRef = this._dialog.open(SetupOtpComponent, {
                            autoFocus: true,
                            data: { uid: res.uid, qrcode: res?.data, seed: res?.secret },
                            panelClass: 'fuse-confirmation-dialog-panel',
                            height: '450px',
                            width: '350px',
                            disableClose: true
                        });

                        return dialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(wasSetup => {

                            if (wasSetup) {
                                this._tokenService.setCredentials = { rememberMe, email };
                                this._router.navigate(["/profile"]);
                            }

                        });
                    };

                    dialogRef = this._dialog.open(OtpComponent, {
                        autoFocus: true,
                        data: res.uid,
                        panelClass: 'fuse-confirmation-dialog-panel',
                        height: "325px",
                        width: "500px",
                        disableClose: true
                    });

                    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(otpValid => {

                        if (otpValid) {
                            this._tokenService.setCredentials = { rememberMe, email };
                            this._router.navigate(["/profile"]);
                        }

                    });
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
            'password': "Password!234",
            'rememberMe': creds.rememberMe
        });

        this.signInForm.updateValueAndValidity();
    };

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    };
};
