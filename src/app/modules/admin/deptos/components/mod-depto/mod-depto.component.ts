import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {FormGroup} from '@angular/forms';
import {DeptoModel} from '@app/modules/admin/deptos/models/depto.model';

@Component({
    selector: 'app-mod-depto',
    templateUrl: './mod-depto.component.html',
    styleUrls: ['./mod-depto.component.scss']
})
export class ModDeptoComponent implements OnInit, AfterViewInit
{
    cargandoDatos = false;

    formDepto: FormGroup;

    constructor(private fb: RxFormBuilder, private cd: ChangeDetectorRef)
    {
    }

    ngOnInit(): void
    {
        const depto = new DeptoModel();
        this.formDepto = this.fb.formGroup(depto);
    }

    registrar(): void
    {
        console.log(this.formDepto.value);
    }

    cancelar(): void
    {

    }

    ngAfterViewInit(): void
    {
        this.cd.detectChanges();
    }
}
