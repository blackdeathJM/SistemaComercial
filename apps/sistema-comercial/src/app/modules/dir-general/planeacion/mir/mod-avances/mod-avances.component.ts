import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MirActAvances} from '#/libs/models/src/lib/dir-general/planeacion/mir/mirActAvances';
import {EntityMir} from '@s-dir-general/mir/store/mir.entity';

@Component({
    selector: 'app-mod-avances',
    standalone: true,
    imports: [CommonModule, MatInputModule, RegistrosComponent, ReactiveFormsModule, RxReactiveFormsModule],
    templateUrl: './mod-avances.component.html',
    styleUrls: ['./mod-avances.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModAvancesComponent implements OnInit, AfterViewInit
{
    formModAvances: FormGroup;

    constructor(private fb: RxFormBuilder, public entityMir: EntityMir)
    {
    }

    ngOnInit(): void
    {
        this.formModAvances = this.fb.formGroup(new MirActAvances());
    }

    ngAfterViewInit(): void
    {
        this.formModAvances.patchValue(this.entityMir.snapshot.mir);
    }
}
