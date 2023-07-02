import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OtpDialogComponent implements OnInit {

  public authForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public matDialogRef: MatDialogRef<OtpDialogComponent>,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  };

  initForm() {
    this.authForm = this._fb.group({
      code: ['', [Validators.required, Validators.maxLength(6)]],
      uid: [this.data, [Validators.required]]
    });
  };

  login() {
    console.log(this.authForm.value);
  };
};