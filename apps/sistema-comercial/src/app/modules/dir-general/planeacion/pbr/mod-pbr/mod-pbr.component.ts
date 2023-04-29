import {AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ReactiveFormConfig, RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {Pbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/Pbr';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {SeleccionarEmpleadoComponent} from '@s-shared/components/seleccionar-empleado/seleccionar-empleado.component';
import {EmpleadoQuery} from '@s-dirAdmonFinanzas/empleados/store/empleado.query';
import {SeleccionQuery} from '@s-dir-general/selecciones/store/seleccion.query';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {GeneralService} from '@s-services/general.service';
import {finalize, Subscription} from 'rxjs';
import {TRegPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';
import {actualizarPbr, PlaneacionService} from '@s-dir-general/store/planeacion.service';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';

@Component({
    selector: 'app-mod-pbr',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatIconModule, MatToolbarModule, MatButtonModule, ReactiveFormsModule, RxReactiveFormsModule, MatOptionModule, MatSelectModule,
        SeleccionarEmpleadoComponent],
    providers: [],
    templateUrl: './mod-pbr.component.html',
    styleUrls: ['./mod-pbr.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModPbrComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy
{
    @Output() panel = new EventEmitter<boolean>();
    formPbr: FormGroup;
    cargando = false;
    empleados: IResolveEmpleado[];
    centrosGestores: string[] = [];
    unidades: string[] = [];
    actualizar = false;
    sub: Subscription = new Subscription();

    constructor(private fb: RxFormBuilder, private seleccionQuery: SeleccionQuery, public empleadoQuery: EmpleadoQuery, private planeacionQuery: PlaneacionQuery,
                private planeacionService: PlaneacionService)
    {
        ReactiveFormConfig.set({
            'validationMessage': {
                'required': 'Este campo es requerido',
                'numeric': 'El valor debe ser numerico'
            }
        });
    }

    ngOnInit(): void
    {
        this.formPbr = this.fb.formGroup(new Pbr());
    }

    ngAfterContentInit(): void
    {
        this.sub.add(this.empleadoQuery.selectAll().subscribe(res => this.empleados = res));
        this.sub.add(this.seleccionQuery.select().subscribe((res) =>
        {
            this.centrosGestores = res.centroGestor;
            this.unidades = res.unidad;
        }));
    }

    ngAfterViewInit(): void
    {
        if (actualizarPbr()[0])
        {
            const cuestionarioPbr = this.planeacionQuery.getActive().pbrCuestionario[actualizarPbr()[1]];
            this.formPbr.patchValue(cuestionarioPbr);
            this.actualizar = true;
        }
    }

    regPbr(): void
    {
        this.cargando = true;
        const datos: TRegPbr =
            {
                _id: this.planeacionQuery.getActive()._id,
                ...this.formPbr.value
            };
        console.log('pbr', datos);
        this.formPbr.disable();

        this.planeacionService.regPbr(datos).pipe(finalize(() =>
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

    empleadoSele(e: string): void
    {
        const empleado = this.empleadoQuery.getEntity(e);
        if (empleado?.correo)
        {
            this.formPbr.get('correo').setValue(empleado.correo);
        } else
        {
            this.formPbr.get('correo').reset();
        }
        this.formPbr.get('responsable').setValue(empleado.nombreCompleto);
    }

    filtrarEmpleados(e: string): void
    {
        this.empleados = GeneralService.filtradoEmpleados(e, [...this.empleadoQuery.getAll()]);
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
