import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { fuseAnimations } from '@fuse/animations';
import { ControlsValidations } from 'utils';
import { ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector      : 'app-register',
  templateUrl   : './register.component.html',
  styleUrls     : ['./register.component.scss'],
  animations    : fuseAnimations,
  encapsulation : ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  @ViewChild(FormGroupDirective) formRef: FormGroupDirective;
  // @ViewChild('myForm', { static: true }) public Form: FormGroupDirective;

  public registerForm!: FormGroup;
  public passwordRegex: RegExp;
  public loading      : boolean;

  constructor(
    private _fb: FormBuilder, 
    private _authSvc: AuthService) { 
    this.passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
  }

  ngOnInit(): void {
    this.initFormGroup();
  }

  /**
   * INIT FORM GROUP
   */
  initFormGroup() {
    this.registerForm = this._fb.group({
      name          :  ['', [Validators.required]],
      lastName      :  ['', [Validators.required]],
      email         :  ['', [Validators.required, Validators.email]],
      password      :  ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      passwordMatch :  ['', Validators.required],
      terms         :  [false, Validators.requiredTrue]
    }, 
    {
      validators: [this.matchPassword('password', 'passwordMatch')]
    })
  }

  /**
   * 
   * @param passwordControl - Password to match
   * @param passwordMatchControl - Password to confirm
   * @returns If values are differents set error in passwordMatchControl
   */
  matchPassword(passwordControl: string, passwordMatchControl: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls[passwordControl];
      const passwordMatch = formGroup.controls[passwordMatchControl];

      if (passwordMatch.errors && !passwordMatch.errors.MustMatch) return;

      (password.value != passwordMatch.value) ? passwordMatch.setErrors({ mustMatch: true }) : passwordMatch.setErrors(null);
    }
  }

  onRegister() {
    this.loading = true;
    if (this.registerForm.invalid) {
      this.loading = false;
      return this.registerForm.markAllAsTouched();
    }

    const { passwordMatch, terms, ...account } = this.registerForm.value;

    this._authSvc.createAccount(account).subscribe(
      (status: number) => {
        this.loading = false;
        this.formRef.resetForm();

        if (status === 200) {
          console.log("Creado");
        }
        return;
      },
      err => {
        this.formRef.resetForm();
        if (err.error.statusCode === 403) {
          console.log(err.error.message);
          return this.loading = false;
        }

        console.log("ERROR");
        this.loading = false;
      })
  }

  /**
   * 
   * @param control - Control's name's to evaluate
   * @returns True if control's not valid
   */
  invalidControl(control: string) {
    return this.registerForm.controls[control].errors && this.registerForm.controls[control].touched;
  }

  get f() {
    return this.registerForm.controls;
  }
}
