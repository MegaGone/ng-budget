import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { SnackbarService } from 'app/utils';

@Component({
  selector: 'setup-dialog',
  templateUrl: './setup-dialog.component.html',
  styleUrls: ['./setup-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetupDialogComponent implements OnInit {

  @ViewChild('input1') input1: ElementRef;
  @ViewChild('input2') input2: ElementRef;
  @ViewChild('input3') input3: ElementRef;
  @ViewChild('input4') input4: ElementRef;
  @ViewChild('input5') input5: ElementRef;
  @ViewChild('input6') input6: ElementRef;

  public authForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { uid: string, qrcode?: string, seed?: string },
    public matDialogRef: MatDialogRef<SetupDialogComponent>,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.authForm = this._fb.group({
      step1: [''],
      step2: [''],
      step3: this._fb.group({
        number1: ['', Validators.required],
        number2: ['', Validators.required],
        number3: ['', Validators.required],
        number4: ['', Validators.required],
        number5: ['', Validators.required],
        number6: ['', Validators.required]
      })
    });
  };
};