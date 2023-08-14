import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'app/core/auth/auth.service';
import { numberOnlyOtp } from 'app/utils';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-setup-otp',
  templateUrl: './setup-otp.component.html',
  styleUrls: ['./setup-otp.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetupOtpComponent implements OnInit, OnDestroy {

  public authForm: FormGroup;
  public isCodeValid: boolean;
  public _unsubscribeAll: Subject<null>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { uid: string, qrcode: string, seed: string },
    public matDialogRef: MatDialogRef<SetupOtpComponent>,
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
      step1: [''],
      step2: [''],
      step3: this._formbuilder.group({
        code: this._formbuilder.group({
          code: ['', Validators.required],
          seed: [this.data.seed, Validators.required],
          uid: [this.data.uid, Validators.required]
        })
      })
    });
  };

  onClose() {
    this.matDialogRef.close();
  };

  onVerifyOtp() {
    if (this.authForm.invalid) return this.authForm.markAllAsTouched();

    this._authService.setupOtp(this.authForm.get("step3.code").value).pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (res: any) => {
          this.matDialogRef.close(true);
        },
        error: (err: HttpErrorResponse) => {

          if (err.status == 400) {
            return console.log("OTP not valid");
          };

          console.log("Error to validate OTP", err);

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
