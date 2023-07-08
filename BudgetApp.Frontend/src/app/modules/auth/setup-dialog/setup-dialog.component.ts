import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { SnackbarService, numberOnly } from 'app/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'setup-dialog',
  templateUrl: './setup-dialog.component.html',
  styleUrls: ['./setup-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetupDialogComponent implements OnInit, OnDestroy {

  @ViewChild('input1') input1: ElementRef;
  @ViewChild('input2') input2: ElementRef;
  @ViewChild('input3') input3: ElementRef;
  @ViewChild('input4') input4: ElementRef;
  @ViewChild('input5') input5: ElementRef;
  @ViewChild('input6') input6: ElementRef;

  public authForm: FormGroup;
  public isCodeValid: boolean;
  public _unsubscribeAll: Subject<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { uid: string, qrcode?: string, seed?: string },
    public matDialogRef: MatDialogRef<SetupDialogComponent>,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _snackbarService: SnackbarService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.authForm = this._fb.group({
      step1: [''],
      step2: [''],
      step3: this._fb.group({
        code: this._fb.group({
          number1: ['', Validators.required],
          number2: ['', Validators.required],
          number3: ['', Validators.required],
          number4: ['', Validators.required],
          number5: ['', Validators.required],
          number6: ['', Validators.required]
        })
      })
    });
  };

  setUp() {
    if (this.authForm.get("step3").get("code").invalid) return;

    const code: string = Object.values(this.authForm.get("step3").get("code").value).join("");
    this._authService.setUp2fa(this.data.uid, this.data.seed, code).pipe(takeUntil(this._unsubscribeAll))
      .subscribe(res => {
        switch (res) {
          case 200:
            this._snackbarService.openSnackBar("Two-factor authentication has been successfully set up.");
            return this.matDialogRef.close(true);

          case 400: return this._snackbarService.openSnackBar("Code not valid.");
          default: return this._snackbarService.openSnackBar("An error occurred while setting up two-factor authentication. Please try again.");
        };
      });
  };

  onInput(nextInputRef: string): void {
    const nextInput = this[nextInputRef];
    return (nextInput && nextInput.nativeElement && nextInputRef !== "input1") ? nextInput.nativeElement.focus() : null;
  };

  onKeyDown(event: KeyboardEvent, i: number): void {
    try {
      var currentInput: ElementRef = this[`input${i}`];
      var previousInput: ElementRef = this[`input${i - 1}`];

      if (event.key === "Backspace") {
        event.preventDefault();
        currentInput.nativeElement.value = "";

        if (i < 2) return;
        previousInput.nativeElement.focus();
      }
    } catch { };
  };

  onlyNumbers(event) {
    return numberOnly(event);
  };

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  };
};