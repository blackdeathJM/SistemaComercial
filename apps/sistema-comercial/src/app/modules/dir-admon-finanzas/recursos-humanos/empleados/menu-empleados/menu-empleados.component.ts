import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuseNavigationItem, FuseNavigationModule} from '@s-fuse/navigation';
import {MatIconModule} from '@angular/material/icon';
import {dirAdmonFinanzas} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

@Component({
    selector: 'app-menu-empleados',
    standalone: true,
    imports: [CommonModule, FuseNavigationModule, MatIconModule],
    templateUrl: './menu-empleados.component.html',
    styleUrls: ['./menu-empleados.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuEmpleadosComponent implements OnInit
{
    menuData: FuseNavigationItem[];

    ngOnInit(): void
    {
        this.menuData =
            [
                {
                    id: 'infoGral',
                    title: 'Info General',
                    icon: 'badge',
                    type: 'basic',
                    oculto: false,
                    puedeAsigPermisos: true,
                    link: dirAdmonFinanzas + 'empleados/info-general'
                },
                {
                    id: 'imss',
                    title: 'IMSS',
                    icon: 'featured_play_list',
                    type: 'basic',
                    oculto: false,
                    puedeAsigPermisos: true,
                    link: dirAdmonFinanzas + 'empleados/imss'
                },
                {
                    id: 'nomina',
                    title: 'Nomina',
                    icon: 'account_balance_wallet',
                    type: 'basic',
                    oculto: false,
                    puedeAsigPermisos: true,
                    link: dirAdmonFinanzas + 'empleados/nomina'
                },
                {
                    id: 'retardos',
                    title: 'Retardos',
                    icon: 'rule',
                    type: 'basic',
                    oculto: false,
                    puedeAsigPermisos: true,
                    link: dirAdmonFinanzas + 'empleados/retardos'
                },
                {
                    id: 'cuotas',
                    title: 'Cuotas',
                    icon: 'money',
                    type: 'basic',
                    oculto: false,
                    puedeAsigPermisos: true,
                    link: dirAdmonFinanzas + 'empleados/cuotas'
                },
                {
                    id: 'fondoDeAhorro',
                    title: 'Fondo de ahorro',
                    icon: 'savings',
                    type: 'basic',
                    oculto: false,
                    puedeAsigPermisos: true,
                    link: dirAdmonFinanzas + 'empleados/fondo-de-ahorro'
                }
            ];
    }
}
