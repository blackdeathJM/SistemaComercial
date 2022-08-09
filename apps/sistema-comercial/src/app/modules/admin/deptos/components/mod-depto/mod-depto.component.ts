import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {NgxToastService} from '#/libs/services/src/lib/ngx-toast.service';
import {Depto} from '@s-app/deptos/model/depto';
import {CrearDeptoGQL} from '#/libs/datos/src/lib/admin/depto/codeGenDepto';
import {STATE_DEPTOS} from '@s-app/deptos/deptos.state';
import {IDepto} from '#/libs/models/src';
import {finalize} from 'rxjs';

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

    constructor(private fb: RxFormBuilder, private dRef: MatDialog, private ngxToast: NgxToastService, private crearDeptoGQL: CrearDeptoGQL)
    {
    }

    ngOnInit(): void
    {
        const depto = new Depto();
        this.formDepto = this.fb.formGroup(depto);
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

        this.crearDeptoGQL.mutate({input: this.formDepto.value}, {
            useMutationLoading: true,
            // update: (store, result) =>
            // {
            //     const data: DepartamentosQuery = store.readQuery({query: DepartamentosDocument});
            //     data.deptos = [...data.deptos, result.data.crearDepto];
            //     store.writeQuery({query: DepartamentosDocument, data});
            // }
        }).pipe(finalize(() => this.ngxToast.satisfactorioToast('El registro se realizo satisfoaci', 'Registro'))).subscribe((res) =>
        {
            if (res.data)
            {
                const elementos = STATE_DEPTOS();
                STATE_DEPTOS([...elementos, res.data.crearDepto as IDepto]);
            }
            this.cargandoDatos = res.loading;
        });
    }

    cancelar(): void
    {
        this.dRef.closeAll();
    }
}
