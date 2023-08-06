import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'app/core/auth/auth.service';
import { numberOnlyOtp } from 'app/utils';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit, OnDestroy {

  public authForm: FormGroup;
  public configForm: FormGroup;
  private _unsubscribeAll: Subject<null>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public matDialogRef: MatDialogRef<OtpComponent>,
    private _formbuilder: FormBuilder,
    private _authService: AuthService
  ) {
    this._unsubscribeAll = new Subject();
  };

  ngOnInit(): void {
    this.initForm();
  };

  initForm() {
    this.authForm = this._formbuilder.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^\d+$/)]],
      uid: [this.data, Validators.required]
    })
  };

  onClose() {
    this.matDialogRef.close();
  };

  onVerifyOtp() {
    if (this.authForm.invalid) return this.authForm.markAllAsTouched();

    this._authService.verifyOtp(this.authForm.value).pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (res: any) => {
          this.matDialogRef.close(true);
        },
        error: (err: HttpErrorResponse) => {
          
          if (err.status == 400) {
            return console.log("OTP not valid");
          };

          console.log("Error to validate OTP")

        }
      })
  };

  onlyNumbers(event) {
    return numberOnlyOtp(event);
  };

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  };
};
