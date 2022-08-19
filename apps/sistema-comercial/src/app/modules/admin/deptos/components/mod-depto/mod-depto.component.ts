import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {NgxToastService} from '#/libs/services/src/lib/ngx-toast.service';
import {Depto} from '#/libs/models/src/lib/admin/deptos/depto';
import {STATE_DEPTOS} from '@s-app/deptos/deptos.state';
import {IDepto} from '#/libs/models/src';
import {finalize, tap} from 'rxjs';
import {unionBy} from 'lodash-es';
import {ActualizarDeptoGQL, CrearDeptoGQL} from '#/libs/datos/src';

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

    constructor(private fb: RxFormBuilder, private dRef: MatDialog, private ngxToast: NgxToastService, private crearDeptoGQL: CrearDeptoGQL,
                @Inject(MAT_DIALOG_DATA) private data: IDepto, private actualizarDeptoGQL: ActualizarDeptoGQL)
    {
    }

    ngOnInit(): void
    {
        const depto = new Depto();
        this.formDepto = this.fb.formGroup(depto);

        if (this.data)
        {
            this.formDepto.patchValue(this.data);
        }
    }

    registrar(): void
    {
        this.cargandoDatos = true;
        // si vienen datos cuando se abre el modal cargamos los datos en el formulario para poder actualizarlos y si no realizamos un nuevo registro
        if (this.data)
        {
            const input = {_id: this.data._id, ...this.formDepto.value} as IDepto;
            this.actualizarDeptoGQL.mutate({input}, {}).pipe(finalize(() => this.cancelar()),
                tap((res) =>
                {
                    if (res.data)
                    {
                        unionBy(STATE_DEPTOS(), res.data.actualizarDepto);
                        this.cargandoDatos = false;
                        this.ngxToast.satisfactorioToast('El registro fue actualizado con exito', 'Modificar datos');
                    }
                })
            ).subscribe();
        } else
        {
            this.crearDeptoGQL.mutate({input: this.formDepto.value}, {
                useMutationLoading: true,
                // update: (store, result) =>
                // {
                //     const data: DepartamentosQuery = store.readQuery({query: DepartamentosDocument});
                //     data.deptos = [...data.deptos, result.data.crearDepto];
                //     store.writeQuery({query: DepartamentosDocument, data});
                // }
            }).pipe(finalize(() => this.cancelar())).subscribe((res) =>
            {
                if (res.data)
                {
                    const elementos = STATE_DEPTOS();
                    STATE_DEPTOS([...elementos, res.data.crearDepto as IDepto]);
                    this.ngxToast.satisfactorioToast('El documento se registro con exito', 'Registro');
                    console.log('Estado', STATE_DEPTOS());
                }
                this.cargandoDatos = res.loading;
            });
        }
    }

    cancelar(): void
    {
        this.dRef.closeAll();
    }
}
