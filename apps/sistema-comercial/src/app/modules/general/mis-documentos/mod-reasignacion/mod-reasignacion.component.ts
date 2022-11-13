import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';

@Component({
    selector: 'app-mod-reasignacion',
    standalone: true,
    imports:
        [
            CommonModule,
            MatDialogModule,
            RegistrosComponent,
            MatFormFieldModule,
            MatDatepickerModule,
            MatInputModule
        ],
    providers: [MatDatepickerModule],
    templateUrl: './mod-reasignacion.component.html',
    styleUrls: ['./mod-reasignacion.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModReasignacionComponent implements OnInit
{

    constructor()
    {
    }

    ngOnInit(): void
    {
    }

}
