import {AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {finalize, Subscription} from 'rxjs';
import {ReactiveFormConfig, RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Mir} from '#/libs/models/src/lib/dir-general/planeacion/mir/Mir';
import {SeleccionType} from '#/libs/datos/src';
import {TrimDirective} from '@s-directives/trim.directive';
import {TrimInputModule} from '@angular-ru/cdk/directives';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {SeleccionQuery} from '@s-dir-general/selecciones/store/seleccion.query';
import {AscDesc} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {TRegMir} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {actualizarMir, idPlaneacion, PlaneacionService} from '@s-dir-general/store/planeacion.service';
import {SeleccionarEmpleadoComponent} from '@s-shared/components/seleccionar-empleado/seleccionar-empleado.component';
import {EmpleadoQuery} from '@s-dirAdmonFinanzas/empleados/store/empleado.query';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {GeneralService} from '@s-services/general.service';

@Component({
    selector: 'app-mod-mir',
    standalone: true,
    imports: [
        CommonModule, MatInputModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, RxReactiveFormsModule, TrimDirective, TrimInputModule, NgxTrimDirectiveModule, SeleccionarEmpleadoComponent],
    providers: [],
    templateUrl: './mod-mir.component.html',
    styleUrls: ['./mod-mir.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModMirComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy
{
    @Output() panel = new EventEmitter<boolean>();
    selecciones: SeleccionType;
    empleados: IResolveEmpleado[];
    formMir: FormGroup;
    actualizar = false;
    sentidoIndicador = Object.values(AscDesc);
    sub = new Subscription();
    cargando = false;

    constructor(private seleccionQuery: SeleccionQuery, private fb: RxFormBuilder, private planeacionService: PlaneacionService, private cdr: ChangeDetectorRef,
                private empleadoQuery: EmpleadoQuery, private planeacionQuery: PlaneacionQuery)
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
        this.formMir = this.fb.formGroup(new Mir());
    }

    ngAfterContentInit(): void
    {
        this.sub.add(this.seleccionQuery.select().subscribe((res) =>
        {
            if (res)
            {
                this.selecciones = res;
            }
        }));

        this.sub.add(this.empleadoQuery.selectAll().subscribe(res => this.empleados = res));
    }

    ngAfterViewInit(): void
    {
        if (actualizarMir()[0])
        {
            const cuestionarioMir = this.planeacionQuery.getActive().mirCuestionario[actualizarMir()[1]];
            this.formMir.patchValue(cuestionarioMir);
            this.actualizar = true;
        }
    }

    regMir(): void
    {
        this.cargando = true;
        const {semefVerdeV, semefAmarilloV, semefRojoV, meta, lineaBaseAno, esActualizar, ...resto} = this.formMir.value;

        const datos: TRegMir =
            {
                _id: idPlaneacion(),
                esActualizar: this.actualizar,
                semefVerdeV: parseFloat(String(semefVerdeV)),
                semefAmarilloV: parseFloat(String(semefAmarilloV)),
                semefRojoV: parseFloat(String(semefRojoV)),
                meta: parseFloat(meta),
                lineaBaseAno: parseInt(lineaBaseAno, 10),
                ...resto
            };

        this.planeacionService.regMir(datos).pipe(finalize(() =>
        {
            this.cargando = false;
            Object.keys(this.formMir.controls).forEach((ctrl) =>
            {
                const ctrlNombre = this.formMir.get(ctrl);
                if (ctrl === 'metodoCalculo' || ctrl === 'nombreDelIndicador' || ctrl === 'programaFinanciacion' || ctrl === 'resumenNarrativo' || ctrl === 'idIndicador')
                {
                    ctrlNombre.reset();
                }
            });
            this.cdr.detectChanges();
        })).subscribe();
    }

    empleadoSele(e: string)
    {
        const empleado = this.empleadoQuery.getEntity(e);
        if (empleado?.correo)
        {
            this.formMir.get('correo').setValue(empleado.correo);
        } else
        {
            this.formMir.get('correo').reset();
        }
        this.formMir.get('responsable').setValue(empleado.nombreCompleto);
    }

    filtrarEmpleados(e: string)
    {
        this.empleados = GeneralService.filtradoEmpleados(e, [...this.empleadoQuery.getAll()]);
    }

    cerrar(): void
    {
        this.panel.emit(false);
    }

    trackByFn(index: number, elemento: any): number | string
    {
        return index || elemento;
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
