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
        path        : "settings",
        loadChildren: () => import('./settings').then(m => m.SettingsModule)
      },
      {
        path        : "fixed-expenses",
        loadChildren: () => import('./fixed-expenses').then(m => m.FixedExpensesModule)
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
