import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
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
import {finalize, tap} from 'rxjs';
import {GeneralService} from '@s-app/services/general.service';
import {TRegEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {DeptosTodosComponent} from '@s-shared/deptos-todos/deptos-todos.component';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {MatSelectModule} from '@angular/material/select';
import {STATE_DEPTOS} from '@s-app/deptos/deptos.state';

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
            MatSelectModule
        ],
    templateUrl: './mod-registro-empleado.component.html',
    styleUrls: ['./mod-registro-empleado.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModRegistroEmpleadoComponent implements OnInit
{
    formEmpleado: FormGroup;
    cargando = false;
    anoActual = new Date().getFullYear();
    mesActual = new Date().getMonth();
    diaActual = new Date().getDate();

    minDate = new Date(this.anoActual, this.mesActual, this.diaActual - 3);
    maxDate = new Date(this.anoActual, this.mesActual, this.diaActual + 3);
    stateDeptos: IDepto[];

    constructor(private fb: RxFormBuilder, private crearEmpleadoGQL: CrearEmpleadoGQL, private mdr: MatDialog, private departamentosGQL: DepartamentosGQL)
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

        this.departamentosGQL.watch().valueChanges.pipe(tap((res) =>
        {
            this.stateDeptos = STATE_DEPTOS(res.data.deptos as IDepto[]);
        })).subscribe();
    }

    agregarTel(): any
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
        console.log('datos del formulario', this.formEmpleado.value);
        const {fechaIngreso, ...resto} = this.formEmpleado.value;

        const empleadoDatos: TRegEmpleado =
            {
                fechaIngreso: GeneralService.convertirUnix(fechaIngreso._i),
                modificadoPor:
                    [
                        {
                            usuario: 'Administrador',
                            accion: 'Registro de nuevo empleado',
                            fecha: GeneralService.fechaHoraActual(),
                            valorActual: {},
                            valorAnterior: {}
                        }
                    ],
                ...resto
            };
        console.log(empleadoDatos);
        // this.crearEmpleadoGQL.mutate({empleadoDatos}).pipe(finalize(() => this.cerrar())).subscribe((res) =>
        // {
        //     this.cargando = false;
        //     console.log(res);
        // });
    }

    cerrar(): void
    {
        this.mdr.closeAll();
    }
}
