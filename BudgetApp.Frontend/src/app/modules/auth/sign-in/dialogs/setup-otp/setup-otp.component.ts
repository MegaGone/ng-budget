import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'app/core/auth/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-setup-otp',
  templateUrl: './setup-otp.component.html',
  styleUrls: ['./setup-otp.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetupOtpComponent implements OnInit {

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
          code: ['', Validators.required]
        })
      })
    });
  };
};
