import { NgModule } from '@angular/core';

import { ActivateUserRoutingModule } from './activate-user-routing.module';
import { ActivateUserComponent } from './activate-user.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ActivateUserComponent
  ],
  imports: [
    ActivateUserRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class ActivateUserModule { }
