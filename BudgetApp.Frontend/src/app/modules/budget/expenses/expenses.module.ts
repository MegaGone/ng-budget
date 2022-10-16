import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { ExpensesTableComponent } from './expenses-table/expenses-table.component';


@NgModule({
  declarations: [
    ExpensesComponent,
    ExpensesTableComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule
  ]
})
export class ExpensesModule { }
