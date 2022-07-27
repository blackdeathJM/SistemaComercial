import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {FormGroup} from '@angular/forms';
import {DeptoModel} from '@app/modules/admin/deptos/models/depto.model';
import {MatDialog} from '@angular/material/dialog';
import {DeptosService} from '@app/modules/admin/deptos/deptos.service';
import {tap} from 'rxjs';
import {STATE_DEPTOS} from '@app/modules/admin/deptos/deptos.state';

@Component({
    selector: 'app-mod-depto',
    templateUrl: './mod-depto.component.html',
    styleUrls: ['./mod-depto.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModDeptoComponent implements OnInit
{
    cargandoDatos = false;

    formDepto: FormGroup;

    constructor(private fb: RxFormBuilder, private cd: ChangeDetectorRef, private dRef: MatDialog, private deptosService: DeptosService)
    {
    }

    ngOnInit(): void
    {
        const depto = new DeptoModel();
        this.formDepto = this.fb.formGroup(depto);
    }

    registrar(): void
    {
        this.deptosService.crearDepto(this.formDepto.value).pipe(tap((res) =>
        {
            // console.log('Modal', res[0]['graphQLErrors']['0']['extensions']['response']['message']);
            console.log('respuesta', res);
            if (!res)
            {
                console.log('Modal', res);
            } else
            {
                console.log('esta registrando de nuez');
                const elementos = STATE_DEPTOS();
                this.cargandoDatos = res.loading;
                STATE_DEPTOS([...elementos, res.data['crearDepto']]);
            }

        })).subscribe();
    }

    cancelar(): void
    {
        this.dRef.closeAll();
    }
}
