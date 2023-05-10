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
import {actualizarMir, PlaneacionService, ValoresCamposMod} from '@s-dir-general/store/planeacion.service';
import {EmpleadoQuery} from '@s-dirAdmonFinanzas/empleados/store/empleado.query';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
    selector: 'app-mod-mir',
    standalone: true,
    imports: [
        CommonModule, MatInputModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, RxReactiveFormsModule,
        TrimDirective, TrimInputModule, NgxTrimDirectiveModule, MatTooltipModule],
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
    idEmpleadoAnterior: string;
    sub = new Subscription();
    cargando = false;

    constructor(private seleccionQuery: SeleccionQuery, private fb: RxFormBuilder, private planeacionService: PlaneacionService, private cdr: ChangeDetectorRef,
                private empleadoQuery: EmpleadoQuery, private planeacionQuery: PlaneacionQuery)
    {
        ReactiveFormConfig.set({
            'validationMessage': {
                'required': 'Este campo es requerido',
                'numeric': 'El valor debe ser numerico',
                'email': 'El texto no cumple con las caracteristicas de email'
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

        // TODO: Cambiar a forma reactiva el patch del form
        // obtenemos a traves de una variable de apollo makeVar dos parametros el primero es un booleano que no idica si se va actualizar y el segundo es el
        // indice del mirCuestionario para hacer el patch en el formulario y cambiamos la propiedad actualizar en true, que es recibida en el backend para hacer
        // el proceso de actualizar el documento
        if (actualizarMir()[0])
        {
            const cuestionarioMir = this.planeacionQuery.getActive().mirCuestionario[actualizarMir()[1]];
            this.formMir.patchValue(cuestionarioMir);
            this.actualizar = true;
            this.idEmpleadoAnterior = cuestionarioMir.idEmpleado;
        }
    }

    regMir(): void
    {
        this.cargando = true;
        const {semefVerdeV, semefAmarilloV, semefRojoV, meta, esActualizar, ...resto} = this.formMir.value;

        const datos: TRegMir =
            {
                _id: this.planeacionQuery.getActive()._id,
                esActualizar: this.actualizar,
                semefVerdeV: parseFloat(String(semefVerdeV)),
                semefAmarilloV: parseFloat(String(semefAmarilloV)),
                semefRojoV: parseFloat(String(semefRojoV)),
                meta: parseFloat(meta),
                ...resto
            };

        this.planeacionService.regMir(datos).pipe(finalize(() =>
        {
            this.cargando = false;
            Object.keys(this.formMir.controls).forEach((ctrl) =>
            {
                const ctrlNombre = this.formMir.get(ctrl);
                if (ctrl === 'metodoCalculo' || ctrl === 'nombreDelIndicador' || ctrl === 'programaFinanciacion' || ctrl === 'resumenNarrativo' || ctrl === 'idIndicador' || ctrl === 'mediosVerificacion'
                    || ctrl === 'supuestos' || ctrl === 'definicionIndicador')
                {
                    ctrlNombre.reset();
                }
            });
            this.cdr.detectChanges();
        })).subscribe();
    }

    empleadoSele(e: string): void
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

    filtrarEmpleados(e: string): void
    {
        this.empleados = this.empleadoQuery.filEmpleados(e);
    }

    actualizarResponsable(): void
    {
        this.planeacionService.actualizarResponsable(this.formMir, this.idEmpleadoAnterior, ValoresCamposMod.mirCuestionario);
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
