import {AfterContentInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {Empleado, Telefono} from '#/libs/models/src/lib/admin/empleado/empleado';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CrearEmpleadoGQL, DepartamentosGQL} from '#/libs/datos/src';
import {TRegEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {DeptosTodosComponent} from '@s-shared/components/deptos-todos/deptos-todos.component';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {MatSelectModule} from '@angular/material/select';
import {finalize, Observable} from 'rxjs';
import {CapitalizarDirective} from '@s-directives/capitalizar.directive';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {GeneralService} from '#/apps/sistema-comercial/src/app/services/general.service';
import {DeptoStore} from '@s-admin/depto.store';
import {Select} from '@ngxs/store';
import {StateAuth} from '@s-core/auth/auth.store';
import {StateEmpleados} from '@s-admin/empleados.store';

@Component({
    selector: 'app-mod-registro-empleado',
    standalone: true,
    imports:
        [
            CommonModule,
            ReactiveFormsModule,
            RxReactiveFormsModule,
            MatDialogModule,
            MatFormFieldModule,
            MatInputModule,
            RegistrosComponent,
            MatDatepickerModule,
            MatButtonModule,
            MatIconModule,
            MatTooltipModule,
            DeptosTodosComponent,
            MatSelectModule,
            CapitalizarDirective,
            NgxTrimDirectiveModule
        ],
    templateUrl: './mod-registro-empleado.component.html',
    styleUrls: ['./mod-registro-empleado.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModRegistroEmpleadoComponent implements OnInit, AfterContentInit
{
    @Select(DeptoStore.deptos)
    deptos$: Observable<IDepto[]>;
    formEmpleado: FormGroup;
    cargando = false;

    anoActual = new Date().getFullYear();
    mesActual = new Date().getMonth();
    diaActual = new Date().getDate();

    minDate = new Date(this.anoActual, this.mesActual, this.diaActual - 5);
    maxDate = new Date(this.anoActual, this.mesActual, this.diaActual);

    constructor(private fb: RxFormBuilder, private crearEmpleadoGQL: CrearEmpleadoGQL, public mdr: MatDialog, public stateEmpleado: StateEmpleados
        , public stateDepto: DeptoStore, private stateAuth: StateAuth)
    {
    }

    // get telefonos(): any
    // {
    //     // return this.formEmpleado.controls.telefono as FormArray;
    //     return (this.formEmpleado.get('telefono') as FormArray).controls;
    // }

    // filtro = (d: Date | null): boolean =>
    // {
    //     const day = (d || new Date()).getDay();
    //     return day !== 0 && day !== 6;
    // };

    ngOnInit(): void
    {
        const empleado = new Empleado();
        empleado.telefono = new Array<Telefono>();
        this.formEmpleado = this.fb.formGroup(empleado);
        this.agregarTel();
    }

    ngAfterContentInit(): void
    {
        this.stateDepto.cargarDeptos();
    }

    agregarTel(): void
    {
        const telefono = this.formEmpleado.controls.telefono as FormArray;
        if (telefono.length === 3)
        {
            return;
        }
        telefono.push(this.fb.formGroup(Telefono));
    }

    eliminarTel(index: number): void
    {
        const telefono = this.formEmpleado.controls.telefono as FormArray;
        if (telefono.length === 1)
        {
            return;
        }
        telefono.removeAt(index);
    }

    regEmpleado(): void
    {
        this.cargando = true;
        this.formEmpleado.disable();
        const {fechaIngreso, ...resto} = this.formEmpleado.value;
        const empleadoDatos: TRegEmpleado =
            {
                fechaIngreso: GeneralService.convertirUnix(fechaIngreso.c, fechaIngreso.ts),
                modificadoPor:
                    [
                        {
                            usuario: this.stateAuth.snapshot._id,
                            accion: 'Registro de nuevo empleado',
                            fecha: GeneralService.fechaHoraActual(),
                            valorActual: {},
                            valorAnterior: {}
                        }
                    ],
                ...resto
            };
        this.stateEmpleado.crearEmpleado(empleadoDatos).pipe(finalize(() =>
        {
            this.cargando = false;
            this.formEmpleado.enable();
            this.mdr.closeAll();
        })).subscribe();
    }
}
