import { Route } from '@angular/router';
import { AdminGuard, AuthGuard } from './guards';
import { BudgetComponent } from './modules/budget/budget.component';

export const appRoutes: Route[] = [
    {
        path        : 'auth',
        loadChildren: () => import("./modules/auth").then(m => m.AuthModule)
    },
    {
        path            : 'budget',
        component       : BudgetComponent,
        canActivate     : [AuthGuard],
        children    : [
            { 
                path        : "expenses", 
                loadChildren: () => import('./modules/budget/expenses').then(m => m.ExpensesModule) 
            },
            { 
                path        : "reports" , 
                loadChildren: () => import('./modules/budget/reports').then(m => m.ReportsModule) 
            },
            { 
                path        : "settings", 
                loadChildren: () => import('./modules/budget/settings').then(m => m.SettingsModule) 
            },
            { 
                path        : "fixed-expenses", 
                loadChildren: () => import('./modules/budget/fixed-expenses').then(m => m.FixedExpensesModule) 
            },
            {
                path        : '**',
                redirectTo  : "expenses"
            }
        ]
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'auth'
    }
];
