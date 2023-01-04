import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Depto} from '#/libs/models/src/lib/admin/deptos/depto';
import {finalize, tap} from 'rxjs';
import {ActualizarDeptoGQL, CrearDeptoGQL} from '#/libs/datos/src';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CapitalizarDirective} from '@s-directives/capitalizar.directive';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {TrimDirective} from '@s-directives/trim.directive';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {EntityDeptoStore} from '@s-admin/entity-depto.store';

@Component({
    standalone: true,
    imports:
        [
            CommonModule,
            MatDialogModule,
            MatFormFieldModule,
            MatInputModule,
            ReactiveFormsModule,
            RxReactiveFormsModule,
            CapitalizarDirective,
            TrimDirective,
            RegistrosComponent,
            NgxTrimDirectiveModule
        ],
    selector: 'app-mod-depto',
    templateUrl: './mod-depto.component.html',
    styleUrls: ['./mod-depto.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModDeptoComponent implements OnInit
{
    cargandoDatos = false;
    formDepto: FormGroup;

    constructor(private fb: RxFormBuilder, public dRef: MatDialog, private ngxToast: NgxToastService, private crearDeptoGQL: CrearDeptoGQL,
                private entityDeptoStore: EntityDeptoStore, private actualizarDeptoGQL: ActualizarDeptoGQL, @Inject(MAT_DIALOG_DATA) private depto: IDepto)
    {

    }

    ngOnInit(): void
    {
        this.formDepto = this.fb.formGroup(new Depto());
        if (isNotNil(this.depto))
        {
            this.formDepto.patchValue(this.depto);
        }
    }

    registrar(): void
    {
        this.cargandoDatos = true;
        // si vienen datos cuando se abre el modal cargamos los datos en el formulario para poder actualizarlos y si no realizamos un nuevo registro
        if (isNotNil(this.depto))
        {
            const input = {_id: this.depto._id, ...this.formDepto.value};
            this.actualizarDeptoGQL.mutate({input}, {}).pipe(finalize(() => this.dRef.closeAll()),
                tap((res) =>
                {
                    if (res.data)
                    {
                        const actualizarDepto = $cast<IDepto>(res.data.actualizarDepto);
                        const seleccionar = this.entityDeptoStore.selectOne(actualizarDepto._id);

                        this.entityDeptoStore.updateOne({id: seleccionar._id, changes: actualizarDepto});
                        this.ngxToast.satisfactorioToast('El registro fue actualizado con exito', 'Modificar datos');
                    }
                    this.cargandoDatos = res.loading;
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
            }).pipe(finalize(() => this.dRef.closeAll())).subscribe((res) =>
            {
                if (isNotNil(res.data))
                {
                    const depto = $cast<IDepto>(res.data.crearDepto);
                    this.entityDeptoStore.addOne(depto);
                    this.ngxToast.satisfactorioToast('El documento se registro con exito', 'Registro');
                }
                this.cargandoDatos = res.loading;
            });
        }
    }
}
