import {AfterViewInit, Component, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {MatTableModule, MatTable} from '@angular/material/table';
import {TablaComunDataSource, TablaComunItem} from './tabla-comun-datasource';

@Component({
    selector: 'app-tabla-comun',
    templateUrl: './tabla-comun.component.html',
    styleUrls: ['./tabla-comun.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatTableModule]
})
export class TablaComunComponent implements AfterViewInit
{
    @ViewChild(MatTable) table!: MatTable<TablaComunItem>;
    dataSource: TablaComunDataSource;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['id', 'name'];

    constructor()
    {
        this.dataSource = new TablaComunDataSource();
    }

    ngAfterViewInit(): void
    {
        this.table.dataSource = this.dataSource;
    }
}
