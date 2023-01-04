import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// MATERIAL MODULES
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

// COMPONENTS
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';

// SERVICES
import { AuthService } from 'app/modules';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports: [
    NavbarComponent,
    HeaderComponent
  ],
  providers: [
    AuthService
  ]
})
export class ComponentsModule { }
