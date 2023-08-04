import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SettingsRoutingModule } from './settings-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components';

// FUSE
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FuseCardModule } from '@fuse/components/card';
import { MatSelectModule } from "@angular/material/select";

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
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FuseCardModule,
    MatSelectModule,
    ComponentsModule
  ],
  providers: [SnackbarService]
})
export class SettingsModule { }
