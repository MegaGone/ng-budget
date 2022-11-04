import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './budget.component';

const routes: Routes = [
  {
    path      : "",
    component : BudgetComponent,
    children  : [
      {
        path        : "expenses",
        loadChildren: () => import('./expenses').then(m => m.ExpensesModule)
      },
      {
        path        : "reports",
        loadChildren: () => import('./reports').then(m => m.ReportsModule)
      },
      {
        path        : "",
        redirectTo  : "expenses"
      },
      {
        path        : "**",
        redirectTo  : "expenses"
      }
    ]
  },
  {
    path      : "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
