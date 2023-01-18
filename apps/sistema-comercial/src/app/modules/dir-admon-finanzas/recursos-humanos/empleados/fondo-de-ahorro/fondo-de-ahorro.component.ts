import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuseCardModule} from '@s-fuse/card';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {fuseAnimations} from '@s-fuse/public-api';

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

@Component({
    selector: 'app-fondo-de-ahorro',
    standalone: true,
    imports: [CommonModule, FuseCardModule, MatCardModule, MatTableModule, MatButtonModule],
    templateUrl: './fondo-de-ahorro.component.html',
    styleUrls: ['./fondo-de-ahorro.component.scss'],
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FondoDeAhorroComponent
{
    columnasFondo: string[] = ['noCatorcena', 'del', 'al', 'diasLaborados', 'patron', 'obrero', 'aportacionAdicional', 'total'];
    columnasFondoMostrar: string[] = this.columnasFondo.slice();
    dataFondo: IFondoAhorro[] = DATA_FONDO_AHORRO;
}
