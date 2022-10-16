import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'auth',
        loadChildren: () => import("./modules/auth").then(m => m.AuthModule)
    },
    {
        path: 'expenses',
        loadChildren: () => import("./modules/budget").then(m => m.ExpensesModule)
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'auth'
    }
];
