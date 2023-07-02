import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// MATERIAL MODULES
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';

// SERVICES
import { AuthService } from 'app/modules';
import { SelectFilterComponent } from './select-filter/select-filter.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    SelectFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    SelectFilterComponent
  ],
  providers: [
    AuthService
  ]
})
export class ComponentsModule { }
