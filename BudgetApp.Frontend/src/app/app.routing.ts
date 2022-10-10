import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'auth'
    }
];
