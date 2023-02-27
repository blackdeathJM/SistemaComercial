import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
    selector: 'app-lista-mir',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatTooltipModule],
    templateUrl: './lista-mir.component.html',
    styleUrls: ['./lista-mir.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaMirComponent {
    columnasMostrar = [];
    dataSource: MatTableDataSource<any>;
}
