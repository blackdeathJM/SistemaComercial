import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {RegistrosComponent} from "@s-shared/registros/registros.component";
import {MatSelectModule} from "@angular/material/select";
import {RxFormBuilder, RxReactiveFormsModule} from "@rxweb/reactive-form-validators";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Planeacion} from "#/libs/models/src/lib/dir-general/planeacion/Planeacion";

@Component({
    selector: 'sistema-comercial-mod-inicialzar-registro',
    standalone: true,
    imports: [CommonModule, MatInputModule, RegistrosComponent, MatSelectModule, ReactiveFormsModule, RxReactiveFormsModule],
    templateUrl: './mod-inicialzar-registro.component.html',
    styleUrls: ['./mod-inicialzar-registro.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModInicialzarRegistroComponent implements OnInit
{

    formPlaneacion: FormGroup;

    constructor(private fb: RxFormBuilder)
    {
    }

    ngOnInit(): void
    {
        this.formPlaneacion = this.fb.formGroup(new Planeacion());
    }

    inicializarPlaneacion(): void
    {

    }
}
