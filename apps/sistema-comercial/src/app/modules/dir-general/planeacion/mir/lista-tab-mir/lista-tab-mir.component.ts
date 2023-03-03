import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ModAvancesComponent} from '@s-dir-general/mir/mod-avances/mod-avances.component';
import {EntityMir} from '@s-dir-general/mir/store/mir.entity';
import {loaderMirs, MirService} from '@s-dir-general/mir/store/mir.service';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {IMir} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface';

@Component({
    selector: 'app-lista-tab-mir',
    standalone: true,
    imports: [CommonModule, MatTabsModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, NgxUiLoaderModule],
    providers: [MirService],
    templateUrl: './lista-tab-mir.component.html',
    styleUrls: ['./lista-tab-mir.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaTabMirComponent implements OnInit
{
    loader = loaderMirs;

    constructor(private mdr: MatDialog, public entityMir: EntityMir, private mirService: MirService)
    {
    }

    ngOnInit(): void
    {

    }

    trackByFn(index: number, elemento: IMir): string | number
    {
        return elemento._id || index;
    }

    regAvances(): void
    {
        this.mdr.open(ModAvancesComponent, {width: '45%'});
    }

    matTab(mir: IMir): void
    {
        console.log('**-**-**-', mir);
    }
}
