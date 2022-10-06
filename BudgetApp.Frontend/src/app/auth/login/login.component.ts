import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { ILogin, IRemember } from 'app/models';

@Component({
  selector      : 'app-login',
  templateUrl   : './login.component.html',
  styleUrls     : ['./login.component.scss'],
  encapsulation : ViewEncapsulation.None,
  animations    : fuseAnimations
})
export class LoginComponent implements OnInit {

  public loginForm    : FormGroup;
  public passwordRegex: RegExp;

  // TODO: CHANGE FACEBOOK LOGIN FOR GOOGLE
  constructor(private _fb: FormBuilder) { 
    this.passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  /**
   * INIT FORM
   */
  initLoginForm() {    
    const creds = JSON.parse(localStorage.getItem("credentials"));

    this.loginForm = this._fb.group({
      email   :  ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      remember:  [false]
    })
    
    this.setCredentials(creds);
  }

  /**
   * LOGIN
   */
  login() {
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched(); 
    }

    const { remember, ...creds } = this.loginForm.value;
    const credentials = { remember, "email": creds.email };

    (remember) ? localStorage.setItem("credentials", JSON.stringify(credentials)) : localStorage.removeItem("credentials");

  }

  /**
   * FORM REFERENCE
   */
  get f() {
    return this.loginForm.controls;
  }

  setCredentials(creds: IRemember) {
    if (creds != null) {
      this.loginForm.setValue({
        'email'   : creds.email,
        'password': "",
        'remember': creds.remember
      });
      this.loginForm.updateValueAndValidity();
    }
  }
}
