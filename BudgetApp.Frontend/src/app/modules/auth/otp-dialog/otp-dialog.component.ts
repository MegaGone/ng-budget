import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { SnackbarService } from 'app/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OtpDialogComponent implements OnInit {

  public authForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public matDialogRef: MatDialogRef<OtpDialogComponent>,
    private _fb: FormBuilder,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
  };

  initForm() {
    this.authForm = this._fb.group({
      number1: ['', Validators.required],
      number2: ['', Validators.required],
      number3: ['', Validators.required],
      number4: ['', Validators.required],
      number5: ['', Validators.required],
      number6: ['', Validators.required],
    });
  };

  onClose() {
    this.matDialogRef.close();
  };

  login() {
    if (this.authForm.invalid) return Object.values(this.authForm.controls).forEach(c => c.markAsTouched());

    const otpCode = Object.values(this.authForm.value).join('');
    this._authService.verify2fa(otpCode, this.data).subscribe(
      res => {
        console.log(res)
        // this.matDialogRef.close(true);
      },
      err => {
        if (err?.error?.statusCode) {
          console.log(err.error.statusCode);
        }
      });
  };
};