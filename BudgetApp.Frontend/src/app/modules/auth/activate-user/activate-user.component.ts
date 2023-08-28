import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { SnackbarService } from 'app/utils';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styles: [
  ]
})
export class ActivateUserComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<null>;

  public isValidCode: boolean;
  public form: FormGroup;
  private token: number;

  constructor(
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _snackbar: SnackbarService
  ) {
    this._unsubscribeAll = new Subject();
  };

  ngOnInit(): void {
    this.validateOTP();
    this.initForm();
  };

  private validateOTP() {
    this._route.queryParams.pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (params: Params) => {
        const token = params?.token;

        if (!token)
          return this.isValidCode = false;

        this.token = token;
        this.verifyOTP(this.token);
      },
      error: () => {
        this.isValidCode = false;
      }
    });
  };

  public initForm() {
    this.form = this._formbuilder.group({
      password: ['', Validators.required],
      passwordMatch: ['', Validators.required],
      code: [this.token, Validators.required]
    },
    {
      validators: [this.matchPassword('password', 'passwordMatch')]
    })
  };

  public verifyOTP(token: number) {
    this._authService.verifyCode(token).pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.isValidCode = true;
        },
        error: (err: HttpErrorResponse) => {
          this.isValidCode = false;
        }
      })
  };

  public activateUser() {
    this._authService.activateUser(this.form.getRawValue()).pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: () => {
          this._snackbar.open("Password was set up successfully.");
          this._router.navigate(["/sign-in"]);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
        }
      });
  };

  matchPassword(passwordControl: string, passwordMatchControl: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls[passwordControl];
      const passwordMatch = formGroup.controls[passwordMatchControl];

      if (passwordMatch.errors && !passwordMatch.errors.MustMatch) return;

      (password.value != passwordMatch.value) ? passwordMatch.setErrors({ mustMatch: true }) : passwordMatch.setErrors(null);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  };
}
