import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {Pbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/Pbr';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {TRegPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr-consultas.dto';
import {PbrService} from '@s-dir-general/pbr/store/pbr.service';
import {finalize, Subscription} from 'rxjs';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {SeleccionStore} from '@s-dir-general/selecciones/seleccion.store';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {SeleccionarEmpleadoComponent} from '@s-shared/components/seleccionar-empleado/seleccionar-empleado.component';

@Component({
    selector: 'app-mod-pbr',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatIconModule, MatToolbarModule, MatButtonModule, ReactiveFormsModule, RxReactiveFormsModule, MatOptionModule, MatSelectModule, SeleccionarEmpleadoComponent],
    providers: [PbrService],
    templateUrl: './mod-pbr.component.html',
    styleUrls: ['./mod-pbr.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModPbrComponent implements OnInit, OnDestroy
{
    @Output() panel = new EventEmitter<boolean>();
    formPbr: FormGroup;
    cargando = false;
    centrosGestores: string[] = [];
    unidades: string[] = [];
    sub = new Subscription();

    constructor(private fb: RxFormBuilder, private pbrService: PbrService, private seleccionStore: SeleccionStore, public entityEmpleado: EntityEmpleadoStore)
    {
    }

    ngOnInit(): void
    {
        this.formPbr = this.fb.formGroup(new Pbr());
        this.seleccionStore.state$.subscribe((res) =>
        {
            this.centrosGestores = res.centroGestor;
            this.unidades = res.unidad;
        });
    }

    regPbr(): void
    {
        this.cargando = true;
        const ano = parseInt(this.formPbr.get('ano').value, 10);
        const input: TRegPbr =
            {
                ...this.formPbr.value,
                ano
            };
        this.formPbr.disable();

        this.pbrService.regPbr(input).pipe(finalize(() =>
        {
            this.cargando = false;
            this.formPbr.enable();
            Object.keys(this.formPbr.controls).forEach((ctrlNombre) =>
            {
                const ctrl = this.formPbr.get(ctrlNombre);
                if (ctrlNombre === 'dato' || ctrlNombre === 'descripcion')
                {
                    ctrl.reset();
                }
            });
        })).subscribe();
    }

    cerrar(): void
    {
        this.panel.emit(false);
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
