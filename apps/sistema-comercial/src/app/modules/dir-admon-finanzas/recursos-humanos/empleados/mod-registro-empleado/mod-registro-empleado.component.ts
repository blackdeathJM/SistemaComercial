import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RxFormBuilder, RxFormGroup, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RegistrosComponent} from "@s-shared/registros/registros.component";
import {MatDatepickerModule} from "@angular/material/datepicker";

@Component({
    selector: 'app-mod-registro-empleado',
    standalone: true,
    imports:
        [
            CommonModule,
            ReactiveFormsModule,
            RxReactiveFormsModule,
            MatDialogModule,
            MatFormFieldModule,
            MatInputModule,
            RegistrosComponent,
            MatDatepickerModule
        ],
    templateUrl: './mod-registro-empleado.component.html',
    styleUrls: ['./mod-registro-empleado.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModRegistroEmpleadoComponent implements OnInit
{
    formEmpleado: RxFormGroup;

    constructor(private fb: RxFormBuilder)
    {
    }

    ngOnInit(): void
    {
    }
}
