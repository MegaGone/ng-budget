import { Route } from '@angular/router';
import { AdminGuard, AuthGuard } from './guards';

export const appRoutes: Route[] = [
    {
        path: 'auth',
        loadChildren: () => import("./modules/auth").then(m => m.AuthModule)
    },
    {
        path: 'expenses',
        canActivate: [AuthGuard],
        loadChildren: () => import("./modules/budget").then(m => m.ExpensesModule),
    },
    {
        path: 'users',
        canActivate: [AuthGuard, AdminGuard],
        loadChildren: () => import("./modules/admin").then(m => m.UsersModule)
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'auth'
    }
];
