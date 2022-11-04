import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FixedExpensesRoutingModule } from './fixed-expenses-routing.module';
import { FixedExpensesComponent } from './fixed-expenses.component';


@NgModule({
  declarations: [
    FixedExpensesComponent
  ],
  imports: [
    CommonModule,
    FixedExpensesRoutingModule
  ]
})
export class FixedExpensesModule { }
