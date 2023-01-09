import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuseNavigationItem, FuseNavigationModule} from '@s-fuse/navigation';
import {MatIconModule} from '@angular/material/icon';

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
                    activo: true,
                    icon: 'badge',
                    type: 'basic',
                    link: ''
                },
                {
                    id: 'imss',
                    title: 'IMSS',
                    activo: true,
                    icon: 'featured_play_list',
                    type: 'basic',
                    link: ''
                },
                {
                    id: 'nomina',
                    title: 'Nomina',
                    activo: true,
                    icon: 'account_balance_wallet',
                    type: 'basic',
                    link: ''
                },
                {
                    id: 'retardos',
                    title: 'Retardos',
                    activo: true,
                    icon: 'rule',
                    type: 'basic',
                    link: ''
                },
                {
                    id: 'cuotas',
                    title: 'Cuotas',
                    activo: true,
                    icon: 'money',
                    type: 'basic',
                    link: ''
                },
                {
                    id: 'fondoDeAhorro',
                    title: 'Fondo de ahorro',
                    activo: true,
                    icon: 'savings',
                    type: 'basic',
                    link: ''
                }
            ];
    }
}
