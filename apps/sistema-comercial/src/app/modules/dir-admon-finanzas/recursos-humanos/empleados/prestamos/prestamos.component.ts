import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';

export interface IPrestamo
{
    fecha: string;
    cobro: number;
    interes: number;
    noDescuento: string;
}


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
    selector: 'app-prestamos',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatCardModule, MatTableModule],
    templateUrl: './prestamos.component.html',
    styleUrls: ['./prestamos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrestamosComponent
{
    columns: string[] = ['fecha', 'cobro', 'interes', 'noDescuento'];
    columnasAMostrar: string[] = this.columns.slice();
    data: IPrestamo[] = DATA_PRESTAMO;
}
