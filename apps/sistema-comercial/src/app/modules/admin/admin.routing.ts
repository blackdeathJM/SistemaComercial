import {Routes} from '@angular/router';
import {AdminComponent} from '@s-admin/admin.component';
import {AdminGuard} from '@s-admin/admin.guard';

export const adminRouting: Routes =
    [
        {
            path: 'administrador',
            canActivate: [AdminGuard],
            component: AdminComponent,
        }
    ];
