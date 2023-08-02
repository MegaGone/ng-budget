/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Administración',
        type: 'collapsable',
        icon: 'mat_outline:verified_user',
        children: [
            {
                id: 'dashboards.project',
                title: 'Usuarios',
                type: 'basic',
                icon: 'mat_outline:supervised_user_circle',
                link: '/users'
            },
            {
                id: 'dashboards.analytics',
                title: 'Plantillas',
                type: 'basic',
                icon: 'heroicons_outline:template',
                link: '/templates'
            }
        ]
    },
    {
        id: 'example',
        title: 'Gastos',
        type: 'basic',
        icon: 'mat_outline:add_shopping_cart',
        link: '/expenses'
    },
    {
        id: 'example',
        title: 'Gastos fijos',
        type: 'basic',
        icon: 'mat_outline:push_pin',
        link: '/fixed-expenses'
    },
    {
        id: 'example',
        title: 'Reportes',
        type: 'basic',
        icon: 'heroicons_outline:document-report',
        link: '/reports'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
