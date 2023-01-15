import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SettingsRoutingModule } from './settings-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// COMPONENTS
import { SettingsComponent } from './settings.component';

// SERVICES
import { SnackbarService } from 'app/utils';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatSnackBarModule
  ],
  providers: [SnackbarService]
})
export class SettingsModule { }
