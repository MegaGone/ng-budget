import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IResponseStatus } from 'app/models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  public passwordRegex: RegExp;

  constructor(private _fb: FormBuilder, private _authSvc: AuthService) { 
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
      passwordMatch :  ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      terms         :  [false, Validators.required]
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
    if (this.registerForm.invalid) {
      return Object.values(this.registerForm.controls).forEach(c => c.markAsTouched());
    }

    const { passwordMatch, terms, ...account } = this.registerForm.value;

    this._authSvc.createAccount(account).subscribe((status: IResponseStatus) => {

      console.log(status);
    
    })
    
  }
}
