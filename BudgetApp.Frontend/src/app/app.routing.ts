import { Route } from '@angular/router';
import { AdminGuard, AuthGuard } from './guards';

export const appRoutes: Route[] = [
    {
        path        : 'auth',
        loadChildren: () => import("./modules/auth").then(m => m.AuthModule)
    },
    {
        path        : 'budget',
        canActivate : [AuthGuard],
        loadChildren: () => import("./modules/budget").then(m => m.BudgetModule)
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'auth'
    }
];
