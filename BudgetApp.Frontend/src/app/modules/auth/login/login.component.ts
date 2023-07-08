import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { IAlert, ILoginResponse, IRemember } from 'app/interfaces';
import { AuthService } from '../auth.service';
import { FormGroupDirective } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OtpDialogComponent } from '../otp-dialog/otp-dialog.component';
import { Router } from '@angular/router';
import { SnackbarService } from 'app/utils';
import { SetupDialogComponent } from '../setup-dialog/setup-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class LoginComponent implements OnInit {

  @ViewChild(FormGroupDirective) formRef: FormGroupDirective;

  public loginForm: FormGroup;
  public passwordRegex: RegExp;
  public alert: IAlert;
  public showAlert: boolean;
  public uid: string;

  // TODO: CHANGE FACEBOOK LOGIN FOR GOOGLE
  constructor(
    private _fb: FormBuilder,
    private _authSvc: AuthService,
    private _matDialog: MatDialog,
    private router: Router
  ) {
    this.passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
  };

  ngOnInit(): void {
    this.initLoginForm();
  };

  /**
   * INIT FORM
   */
  initLoginForm() {
    const creds = JSON.parse(localStorage.getItem("credentials"));

    this.loginForm = this._fb.group({
      email: ['jimmymartinez016@gmail.com', [Validators.required, Validators.email]],
      password: ['Password!234', [Validators.required, Validators.pattern(this.passwordRegex)]],
      remember: [false]
    })

    this.setCredentials(creds);
  };

  /**
   * LOGIN
   */
  login() {
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }

    const { remember, ...creds } = this.loginForm.value;
    const credentials = { remember, "email": creds.email };

    this._authSvc.login(creds).subscribe(
      (res: ILoginResponse) => {
        if (res.statusCode === 200) {
          this.uid = res.uid;

          if (!res?.data) {
            const dialogRef = this._matDialog.open(OtpDialogComponent, {
              autoFocus: true,
              data: this.uid,
              panelClass: 'fuse-confirmation-dialog-panel',
              height: '350px',
              disableClose: true
            });

            dialogRef.afterClosed().subscribe(res => {
              if (res) {
                (remember) ? localStorage.setItem("credentials", JSON.stringify(credentials)) : localStorage.removeItem("credentials");
                this.router.navigate(["/budget"]);
              }
            });
            return;
          }

          const dialogRef = this._matDialog.open(SetupDialogComponent, {
            autoFocus: true,
            data: { uid: this.uid, qrcode: res?.data, seed: res?.secret },
            panelClass: 'fuse-confirmation-dialog-panel',
            height: '450px',
            maxWidth: '350px',
            disableClose: true
          });

          dialogRef.afterClosed().subscribe(res => {
            if (res) {
              (remember) ? localStorage.setItem("credentials", JSON.stringify(credentials)) : localStorage.removeItem("credentials");
              this.router.navigate(["/budget"]);
            }
          });
        }
      },
      err => {
        this.formRef.resetForm();
        const status: number = err.error.statusCode;

        switch (status) {
          case 403:
            this.alert = {
              alertAppareance: "outline",
              alertType: "warn",
              showIcon: true,
              message: "Forbidden. You are blocked. Talk with an administrator to unlock you.",
              dismissible: true,
              dismissed: false
            }
            return this.showAlert = true;
            break;

          case 404:
            this.alert = {
              alertAppareance: "outline",
              alertType: "warning",
              showIcon: true,
              message: "User not registered. Create an account.",
              dismissible: true,
              dismissed: false
            }
            return this.showAlert = true;
            break;

          case 400:
            this.alert = {
              alertAppareance: "outline",
              alertType: "error",
              showIcon: true,
              message: "Verify your credentials.",
              dismissible: true,
              dismissed: false
            }
            return this.showAlert = true;
            break;
        }

        this.alert = {
          alertAppareance: "outline",
          alertType: "error",
          showIcon: true,
          message: "Error to sign in. Please try later.",
          dismissible: true,
          dismissed: false
        }
        return this.showAlert = true;

      }
    );
  };

  /**
   * FORM REFERENCE
   */
  get f() {
    return this.loginForm.controls;
  };

  setCredentials(creds: IRemember) {
    if (creds != null) {
      this.loginForm.setValue({
        'email': creds.email,
        'password': "",
        'remember': creds.remember
      });
      this.loginForm.updateValueAndValidity();
    }
  };
};