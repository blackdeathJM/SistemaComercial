import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {finalize, Subscription} from 'rxjs';
import {ReactiveFormConfig, RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Mir} from '#/libs/models/src/lib/dir-general/planeacion/mir/Mir';
import {SeleccionType} from '#/libs/datos/src';
import {TrimDirective} from '@s-directives/trim.directive';
import {TrimInputModule} from '@angular-ru/cdk/directives';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {SeleccionQuery} from '@s-dir-general/selecciones/store/seleccion.query';
import {AscDesc} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {TRegMir} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {actCuestionario, PlaneacionService, ValoresCamposMod} from '@s-dir-general/store/planeacion.service';
import {EmpleadoQuery} from '@s-dirAdmonFinanzas/empleados/store/empleado.query';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {MatTooltipModule} from '@angular/material/tooltip';
import {abrirPanelMir} from "@s-dir-general/mir/mir.component";
import {isNotNil} from "@angular-ru/cdk/utils";

@Component({
    selector: 'app-mod-mir',
    standalone: true,
    imports: [
        CommonModule, MatInputModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, RxReactiveFormsModule,
        TrimDirective, TrimInputModule, NgxTrimDirectiveModule, MatTooltipModule, FormsModule],
    providers: [],
    templateUrl: './mod-mir.component.html',
    styleUrls: ['./mod-mir.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModMirComponent implements OnInit, OnDestroy
{
    selecciones: SeleccionType;
    empleados: IResolveEmpleado[];
    formMir: FormGroup = this.fb.formGroup(new Mir());
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
        effect(() =>
        {
            const mir = this.planeacionQuery.cuestionarioMir();
            // obtenemos a traves de una variable de apollo makeVar dos parametros el primero es un booleano que no idica si se va a actualizar y el segundo es el
            if (actCuestionario() && isNotNil(mir))
            {
                const cuestionarioMir = mir;
                this.formMir.patchValue(cuestionarioMir);
                this.idEmpleadoAnterior = cuestionarioMir.idEmpleado;
                this.actualizar = true;
            }
        })
    }

    ngOnInit(): void
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
                if (ctrl !== 'responsable' && ctrl !== 'correo' && ctrl !== 'centroGestor' && ctrl !== 'idEmpleado' && ctrl !== 'semefVerdeV' && ctrl !== 'semefAmarilloV'
                    && ctrl !== 'semefRojoV')
                {
                    ctrlNombre.reset();
                }
            });
            abrirPanelMir.set(!this.actualizar);
            this.cdr.detectChanges();
        })).subscribe();
    }

    empleadoSele(e: string): void
    {
        const empleado = this.empleadoQuery.getEntity(e);
        if (isNotNil(empleado.correo))
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
        this.planeacionService.actualizarResponsable(this.formMir, this.idEmpleadoAnterior, ValoresCamposMod.mirCuestionario).pipe(finalize(() =>
        {
            this.actualizar = true;
        })).subscribe();
    }

    cerrar(): void
    {
        abrirPanelMir.set(false);
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
