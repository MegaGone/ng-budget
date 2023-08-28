import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ActivateUserRoutingModule } from './activate-user-routing.module';
import { ActivateUserComponent } from './activate-user.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { FuseHighlightModule } from '@fuse/components/highlight';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ActivateUserComponent
  ],
  imports: [
    ActivateUserRoutingModule,
    SharedModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FuseCardModule,
    FuseHighlightModule
  ]
})
export class ActivateUserModule { }
