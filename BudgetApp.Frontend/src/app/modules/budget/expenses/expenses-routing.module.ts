import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpensesComponent } from './expenses.component';

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "",   component: ExpensesComponent },
      { path: "**", redirectTo: "" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
