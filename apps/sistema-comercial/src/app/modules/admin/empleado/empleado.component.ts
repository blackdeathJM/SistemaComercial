import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {DrawerComponent} from '@s-shared/plantillas/drawer/drawer.component';
import {MatInputModule} from '@angular/material/input';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {DetalleEmpleadoComponent} from '@s-admin/components/detalle-empleado/detalle-empleado.component';
import {ListaEmpleadosComponent} from '@s-shared/components/lista-empleados/lista-empleados.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ConsultaEmpleadoComponent} from '@s-dirAdmonFinanzas/empleados/consulta-empleado/consulta-empleado.component';
import {EmpleadoService} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {debounceTime, Subscription, switchMap} from 'rxjs';

@Component({
    standalone: true,
    imports:
        [
            CommonModule,
            MatFormFieldModule,
            MatIconModule,
            DrawerComponent,
            MatInputModule,
            ReactiveFormsModule,
            RxReactiveFormsModule,
            DetalleEmpleadoComponent,
            ListaEmpleadosComponent,
            MatSidenavModule,
            ConsultaEmpleadoComponent,
            MatInputModule,
            MatInputModule,
            MatInputModule,
        ],
    selector: 'app-empleado',
    templateUrl: './empleado.component.html',
    styleUrls: ['./empleado.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpleadoComponent implements OnInit, OnDestroy
{
    ctrlBuscar: FormControl = new FormControl();
    private sub = new Subscription();

    constructor(public empleadoService: EmpleadoService)
    {
    }

    ngOnInit(): void
    {
        this.sub.add(this.ctrlBuscar.valueChanges.pipe(debounceTime(3000), switchMap((res: string) =>
            this.empleadoService.filtrarEmpleadosConSesion(res))).subscribe());
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
