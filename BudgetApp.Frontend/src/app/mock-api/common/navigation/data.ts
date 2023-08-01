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
                link: '/dashboards/project'
            },
            {
                id: 'dashboards.analytics',
                title: 'Plantillas',
                type: 'basic',
                icon: 'heroicons_outline:template',
                link: '/dashboards/analytics'
            }
        ]
    },
    {
        id: 'example',
        title: 'Gastos',
        type: 'basic',
        icon: 'mat_outline:add_shopping_cart',
        link: '/example'
    },
    {
        id: 'example',
        title: 'Gastos fijos',
        type: 'basic',
        icon: 'mat_outline:push_pin',
        link: '/example2'
    },
    {
        id: 'example',
        title: 'Reportes',
        type: 'basic',
        icon: 'heroicons_outline:document-report',
        link: '/example3'
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
