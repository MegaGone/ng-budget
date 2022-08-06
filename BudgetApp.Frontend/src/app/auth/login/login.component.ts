import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector      : 'app-login',
  templateUrl   : './login.component.html',
  styleUrls     : ['./login.component.scss'],
  encapsulation : ViewEncapsulation.None,
  animations    : fuseAnimations
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
