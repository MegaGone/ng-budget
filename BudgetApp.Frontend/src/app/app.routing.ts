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
        path: 'settings',
        canActivate: [AuthGuard],
        loadChildren: () => import("./modules/budget").then(m => m.SettingsModule)
    },
    {
        path: 'reports',
        canActivate: [AuthGuard],
        loadChildren: () => import("./modules/budget").then(m => m.ReportsModule)
    },
    {
        path: 'fixed-expenses',
        canActivate: [AuthGuard],
        loadChildren: () => import("./modules/budget").then(m => m.FixedExpensesModule)
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
