import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { ExpensesTableComponent } from './expenses-table/expenses-table.component';

// EXTERNAL
import { AuthService } from '../../auth/auth.service';
import { NavbarComponent } from 'app/components/navbar/navbar.component';


@NgModule({
  declarations: [
    ExpensesComponent,
    ExpensesTableComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule
  ],
  providers: [AuthService]
})
export class ExpensesModule { }
