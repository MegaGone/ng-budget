import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// UI
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FuseCardModule } from '../../../@fuse/components/card/card.module';
import { FuseAlertModule } from '../../../@fuse/components/alert/alert.module';
import { SharedModule } from '../../shared/shared.module';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { OtpDialogComponent } from './otp-dialog/otp-dialog.component';
import { SnackbarService } from 'app/utils';
import { SetupDialogComponent } from './setup-dialog/setup-dialog.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    LoginComponent,
    RegisterComponent,
    OtpDialogComponent,
    SetupDialogComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FuseCardModule,
    FuseAlertModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FuseHighlightModule,
    MatStepperModule
  ],
  providers: [
    SnackbarService
  ]
})
export class AuthModule { }
