import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DeptosService} from '@s-app/modules/admin/deptos/deptos.service';
import {NgxToastService} from '@s-shared/services/ngx-toast.service';

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

    constructor(private fb: RxFormBuilder, private cd: ChangeDetectorRef, private dRef: MatDialog, private deptosService: DeptosService, private ngxToast: NgxToastService)
    {
    }

    ngOnInit(): void
    {
        // const depto = new Depto();
        // this.formDepto = this.fb.formGroup(depto);
    }

    registrar(): void
    {
        // this.deptosService.crearDepto(this.formDepto.value).pipe(finalize(() =>
        // {
        //     GRAPHQL_STATE(null);
        //     this.cargandoDatos = false;
        //     this.cancelar();
        // }), tap((res) =>
        // {
        //     if (!GRAPHQL_STATE())
        //     {
        //         console.log(res);
        //         if (res.data)
        //         {
        //             const elementos = STATE_DEPTOS();
        //             STATE_DEPTOS([...elementos, res.data['crearDepto']]);
        //             this.ngxToast.satisfactorioToast('El registro se ha creado correctamente', 'Registro de departamentos');
        //         }
        //     }
        // })).subscribe();
    }

    cancelar(): void
    {
        this.dRef.closeAll();
    }
}
