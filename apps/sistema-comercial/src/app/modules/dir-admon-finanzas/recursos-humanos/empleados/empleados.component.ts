import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkWithHref, RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MenuEmpleadosComponent} from '@s-dirAdmonFinanzas/empleados/menu-empleados/menu-empleados.component';
import {ListaEmpleadosComponent} from '@s-shared/components/lista-empleados/lista-empleados.component';
import {FuseCardModule} from '@s-fuse/card';
import {ConsultaEmpleadoComponent} from '@s-dirAdmonFinanzas/empleados/consulta-empleado/consulta-empleado.component';
import {MatInputModule} from '@angular/material/input';
import {EmpleadoService} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {DrawerComponent} from '@s-shared/plantillas/drawer/drawer.component';
import {DrawerService} from '@s-shared/plantillas/drawer/drawer.service';
import {MatCardModule} from '@angular/material/card';
import {ModRegistroEmpleadoComponent} from '@s-dirAdmonFinanzas/empleados/mod-registro-empleado/mod-registro-empleado.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from "@angular/material/divider";

export interface IPrestamo
{
    fecha: string;
    cobro: number;
    interes: number;
    noDescuento: string;
}

export interface IFondoAhorro
{
    noCatorcena: number;
    del: string;
    al: string;
    diasLaborados: number;
    patron: number;
    obrero: number;
    aportacionAdicional: number;
    total: number;
}

const DATA_FONDO_AHORRO: IFondoAhorro[] =
    [
        {
            noCatorcena: 1,
            del: '02/01/2022',
            al: '15/01/2022',
            diasLaborados: 14,
            patron: 186.70,
            obrero: 186.70,
            aportacionAdicional: 150.00,
            total: 523.40
        },
        {
            noCatorcena: 2,
            del: '16/01/2022',
            al: '29/01/2022',
            diasLaborados: 14,
            patron: 186.70,
            obrero: 186.70,
            aportacionAdicional: 150.00,
            total: 523.40
        },
        {
            noCatorcena: 3,
            del: '30/01/2022',
            al: '12/02/2022',
            diasLaborados: 14,
            patron: 186.70,
            obrero: 186.70,
            aportacionAdicional: 150.00,
            total: 523.40
        },
        {
            noCatorcena: 4,
            del: '13/02/2022',
            al: '26/02/2022',
            diasLaborados: 14,
            patron: 186.70,
            obrero: 186.70,
            aportacionAdicional: 150.00,
            total: 523.40
        },
        {
            noCatorcena: 5,
            del: '27/02/2022',
            al: '12/03/2022',
            diasLaborados: 14,
            patron: 186.70,
            obrero: 186.70,
            aportacionAdicional: 150.00,
            total: 523.40
        },
        {
            noCatorcena: 6,
            del: '13/03/2022',
            al: '26/03/2022',
            diasLaborados: 14,
            patron: 186.70,
            obrero: 186.70,
            aportacionAdicional: 150.00,
            total: 523.40
        },
        {
            noCatorcena: 7,
            del: '27/03/2022',
            al: '09/04/2022',
            diasLaborados: 14,
            patron: 186.70,
            obrero: 186.70,
            aportacionAdicional: 150.00,
            total: 523.40
        },
        {
            noCatorcena: 8,
            del: '10/04/2022',
            al: '23/04/2022',
            diasLaborados: 14,
            patron: 186.70,
            obrero: 186.70,
            aportacionAdicional: 150.00,
            total: 523.40
        },
        {
            noCatorcena: 9,
            del: '24/04/2022',
            al: '07/05/2022',
            diasLaborados: 14,
            patron: 186.70,
            obrero: 186.70,
            aportacionAdicional: 150.00,
            total: 523.40
        },
        {
            noCatorcena: 10,
            del: '08/05/2022',
            al: '21/05/2022',
            diasLaborados: 14,
            patron: 186.70,
            obrero: 186.70,
            aportacionAdicional: 150.00,
            total: 523.40
        },
        {
            noCatorcena: 11,
            del: '22/05/2022',
            al: '04/06/2022',
            diasLaborados: 14,
            patron: 186.70,
            obrero: 186.70,
            aportacionAdicional: 150.00,
            total: 523.40
        },
        {
            noCatorcena: 12,
            del: '05/06/2022',
            al: '18/06/2022',
            diasLaborados: 14,
            patron: 186.70,
            obrero: 186.70,
            aportacionAdicional: 150.00,
            total: 523.40
        },
        {
            noCatorcena: 13,
            del: '19/06/2022',
            al: '02/07/2022',
            diasLaborados: 14,
            patron: 186.70,
            obrero: 186.70,
            aportacionAdicional: 150.00,
            total: 523.40
        },
        {
            noCatorcena: 14,
            del: '03/07/2022',
            al: '16/07/2022',
            diasLaborados: 14,
            patron: 186.70,
            obrero: 186.70,
            aportacionAdicional: 150.00,
            total: 523.40
        },
        {
            noCatorcena: 15,
            del: '17/07/2022',
            al: '30/07/2022',
            diasLaborados: 14,
            patron: 186.70,
            obrero: 186.70,
            aportacionAdicional: 150.00,
            total: 523.40
        }, {
        noCatorcena: 16,
        del: '31/07/2022',
        al: '13/08/2022',
        diasLaborados: 14,
        patron: 186.70,
        obrero: 186.70,
        aportacionAdicional: 150.00,
        total: 523.40
    }, {
        noCatorcena: 17,
        del: '14/08/2022',
        al: '27/08/2022',
        diasLaborados: 14,
        patron: 186.70,
        obrero: 186.70,
        aportacionAdicional: 150.00,
        total: 523.40
    }, {
        noCatorcena: 18,
        del: '28/08/2022',
        al: '10/09/2022',
        diasLaborados: 14,
        patron: 186.70,
        obrero: 186.70,
        aportacionAdicional: 150.00,
        total: 523.40
    }, {
        noCatorcena: 19,
        del: '11/09/2022',
        al: '24/09/2022',
        diasLaborados: 14,
        patron: 186.70,
        obrero: 186.70,
        aportacionAdicional: 150.00,
        total: 523.40
    }, {
        noCatorcena: 20,
        del: '25/09/2022',
        al: '08/10/2022',
        diasLaborados: 14,
        patron: 186.70,
        obrero: 186.70,
        aportacionAdicional: 150.00,
        total: 523.40
    }, {
        noCatorcena: 21,
        del: '09/10/2022',
        al: '22/10/2022',
        diasLaborados: 14,
        patron: 186.70,
        obrero: 186.70,
        aportacionAdicional: 150.00,
        total: 523.40
    }, {
        noCatorcena: 22,
        del: '23/10/2022',
        al: '05/11/2022',
        diasLaborados: 14,
        patron: 186.70,
        obrero: 186.70,
        aportacionAdicional: 150.00,
        total: 523.40
    }, {
        noCatorcena: 23,
        del: '06/11/2022',
        al: '19/11/2022',
        diasLaborados: 14,
        patron: 186.70,
        obrero: 186.70,
        aportacionAdicional: 150.00,
        total: 523.40
    }, {
        noCatorcena: 24,
        del: '20/11/2022',
        al: '03/12/2022',
        diasLaborados: 14,
        patron: 186.70,
        obrero: 186.70,
        aportacionAdicional: 150.00,
        total: 523.40
    }, {
        noCatorcena: 25,
        del: '04/12/2022',
        al: '17/12/2022',
        diasLaborados: 14,
        patron: 186.70,
        obrero: 186.70,
        aportacionAdicional: 150.00,
        total: 523.40
    }, {
        noCatorcena: 26,
        del: '18/12/2022',
        al: '31/12/2022',
        diasLaborados: 14,
        patron: 186.70,
        obrero: 186.70,
        aportacionAdicional: 150.00,
        total: 523.40
    },
    ];
const DATA_PRESTAMO: IPrestamo[] =
    [
        {
            fecha: '12/02/2023',
            cobro: 400.00,
            interes: 50.00,
            noDescuento: '1/23'
        },
        {
            fecha: '26/02/2023',
            cobro: 400.00,
            interes: 50.00,
            noDescuento: '2/23'
        },
        {
            fecha: '12/03/2023',
            cobro: 400.00,
            interes: 50.00,
            noDescuento: '2/23'
        },
        {
            fecha: '26/03/2023',
            cobro: 400.00,
            interes: 50.00,
            noDescuento: '2/23'
        },
        {
            fecha: '09/03/2023',
            cobro: 400.00,
            interes: 50.00,
            noDescuento: '2/23'
        },
        {
            fecha: '23/03/2023',
            cobro: 400.00,
            interes: 50.00,
            noDescuento: '2/23'
        }
    ];

@Component({
    selector: 'app-empleados',
    standalone: true,
    imports:
        [
            CommonModule,
            MatIconModule,
            RouterLinkWithHref,
            MatButtonModule,
            MatTabsModule,
            MatSidenavModule,
            RouterLink,
            MenuEmpleadosComponent,
            ListaEmpleadosComponent,
            FuseCardModule,
            ConsultaEmpleadoComponent,
            RouterOutlet,
            MatInputModule,
            DrawerComponent,
            MatCardModule,
            MatSelectModule,
            MatTableModule,
            MatDividerModule
        ],
    templateUrl: './empleados.component.html',
    styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit, OnDestroy
{
    columns: string[] = ['fecha', 'cobro', 'interes', 'noDescuento'];
    columnasAMostrar: string[] = this.columns.slice();
    data: IPrestamo[] = DATA_PRESTAMO;
    columnasFondo: string[] = ['noCatorcena', 'del', 'al', 'diasLaborados', 'patron', 'obrero', 'aportacionAdicional', 'total'];
    columnasFondoMostrar: string[] = this.columnasFondo.slice();
    dataFondo: IFondoAhorro[] = DATA_FONDO_AHORRO;

    constructor(private empleadoService: EmpleadoService, private drawerService: DrawerService, private mdr: MatDialog)
    {
    }

    ngOnInit(): void
    {
        this.drawerService.setPanelIzq = true;
        this.empleadoService.empleados().subscribe();
    }


    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    nvoEmpleado(): void
    {
        this.mdr.open(ModRegistroEmpleadoComponent, {data: null, width: '45%'});
    }

    ngOnDestroy(): void
    {
        this.drawerService.setPanelIzq = false;
        this.drawerService.setPanelDer = false;
    }

}
