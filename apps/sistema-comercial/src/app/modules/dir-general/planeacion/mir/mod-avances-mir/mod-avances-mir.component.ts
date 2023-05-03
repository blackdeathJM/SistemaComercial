import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {MatDialogRef} from '@angular/material/dialog';

export interface ICalculo
{
    semVerde: number;
    semAmarillo: number;
    semRojo: number;
}

@Component({
    selector: 'app-mod-avances-mir',
    standalone: true,
    imports: [CommonModule, MatInputModule, RegistrosComponent, ReactiveFormsModule, RxReactiveFormsModule, MatButtonModule, MatIconModule],
    providers: [],
    templateUrl: './mod-avances-mir.component.html',
    styleUrls: ['./mod-avances-mir.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModAvancesMirComponent implements OnInit
{
    formModAvances: FormGroup;
    cargando = false;

    constructor(private fb: RxFormBuilder, private ngxToast: NgxToastService, public mdr: MatDialogRef<ModAvancesMirComponent>)
    {
    }

    ngOnInit(): void
    {
        // this.formModAvances = this.fb.formGroup(new MirActAvances());
        // this.formModAvances.patchValue(this.mirQuery.getActive());
    }

    guardarAvances(): void
    {
    }
}
