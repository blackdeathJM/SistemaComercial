import {Routes} from '@angular/router';

export const generalRouting: Routes =
    [
        {
            path: '',
            loadComponent: () => import('@s-general/general.component').then(g => g.GeneralComponent),
            children:
                [
                    {
                        path: 'mis-documentos',
                        loadComponent: () => import('@s-general/mis-documentos/mis-documentos.component').then(c => c.MisDocumentosComponent)
                    },
                    {
                        path: 'mis-resguardos',
                        loadComponent: () => import('@s-general/mis-resguardos/mis-resguardos.component').then(c => c.MisResguardosComponent)
                    },
                    {
                        path: 'ordenes-atencion',
                        loadComponent: () => import('@s-general/ordenes-atencion/ordenes-atencion.component').then(c => c.OrdenesAtencionComponent)
                    },
                    {
                        path: 'avance-de-actividades',
                        loadComponent: () => import('@s-general/pbr-usuario/pbr-usuario.component').then(a => a.PbrUsuarioComponent)
                    }
                ]
        }
    ];
