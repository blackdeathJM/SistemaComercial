import {Component, OnInit} from '@angular/core';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {FormGroup} from '@angular/forms';
import {DeptoModel} from '@app/modules/admin/deptos/models/depto.model';

@Component({
    selector: 'app-mod-depto',
    templateUrl: './mod-depto.component.html',
    styleUrls: ['./mod-depto.component.scss']
})
export class ModDeptoComponent implements OnInit
{
    cargandoDatos = false;

    formDepto: FormGroup;

    constructor(private fb: RxFormBuilder)
    {
    }

    ngOnInit(): void
    {
        const depto = new DeptoModel();
        this.formDepto = this.fb.formGroup(depto);
    }

}
