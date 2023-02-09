import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Depto} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto';
import {finalize} from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CapitalizarDirective} from '@s-directives/capitalizar.directive';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {TrimDirective} from '@s-directives/trim.directive';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {isNotNil} from '@angular-ru/cdk/utils';
import {DeptoService} from '@s-dirAdmonFinanzas/departamento/store/depto.service';
import {EntityDeptoStore} from '@s-dirAdmonFinanzas/departamento/store/entity-depto.store';

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModDeptoComponent implements OnInit
{
    cargandoDatos = false;
    formDepto: FormGroup;

    constructor(private fb: RxFormBuilder, public dRef: MatDialog, private ngxToast: NgxToastService, private deptoService: DeptoService, private entityDepto: EntityDeptoStore)
    {

    }

    ngOnInit(): void
    {
        this.formDepto = this.fb.formGroup(new Depto());
        if (isNotNil(this.entityDepto.snapshot.depto))
        {
            this.formDepto.patchValue(this.entityDepto.snapshot.depto);
        }
    }

    async registrar(): Promise<void>
    {
        this.cargandoDatos = true;
        // si vienen datos cuando se abre el modal cargamos los datos en el formulario para poder actualizarlos y si no realizamos un nuevo registro
        if (isNotNil(this.entityDepto.snapshot.depto))
        {
            const input = {_id: this.entityDepto.snapshot.depto._id, ...this.formDepto.value};

            this.deptoService.actualizarDepto(input).pipe(finalize(() =>
            {
                this.cargandoDatos = false;
                this.dRef.closeAll();
            })).subscribe();
        } else
        {
            this.deptoService.crearDepto(this.formDepto.value).pipe(finalize(() =>
            {
                this.cargandoDatos = false;
                this.dRef.closeAll();
            })).subscribe();
        }
    }
}
