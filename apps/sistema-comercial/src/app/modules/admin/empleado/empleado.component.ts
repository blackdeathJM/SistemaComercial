import {Component} from '@angular/core';
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
import {ConsultaEmpleadoComponent} from "@s-dirAdmonFinanzas/empleados/consulta-empleado/consulta-empleado.component";

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
    styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent
{
    ctrlBuscar: FormControl = new FormControl();
}
