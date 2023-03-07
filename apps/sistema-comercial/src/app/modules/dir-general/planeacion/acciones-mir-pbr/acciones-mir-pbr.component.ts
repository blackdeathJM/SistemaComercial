import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {SeleccionStore} from '@s-dir-general/selecciones/seleccion.store';
import {FormsModule} from '@angular/forms';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {EmpleadoService} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';

@Component({
    selector: 'app-acciones-mir-pbr',
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatInputModule, MatSelectModule, FormsModule],
    templateUrl: './acciones-mir-pbr.component.html',
    styleUrls: ['./acciones-mir-pbr.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccionesMirPbrComponent
{
    @Output() filtrarPorAno = new EventEmitter<number>();
    @Output() filtrarCentroGestor = new EventEmitter<[string, number]>();
    @Input() buscarPorEmpleado = false;
    buscarAno: number = new Date().getFullYear();

    constructor(public seleccionStore: SeleccionStore, private ngxToast: NgxToastService, public entityEmpleado: EntityEmpleadoStore, private empleadoService: EmpleadoService)
    {
    }

    buscarPorCentroGestor(e: string): void
    {
        const ano = parseInt(String(this.buscarAno), 10);
        if (isNaN(ano))
        {
            this.ngxToast.alertaToast('Es necesario colocar una fecha para poder utilizar este filtrado', 'Filtrar centro gestor');
            return;
        }
        this.filtrarCentroGestor.emit([e, ano]);
    }

    buscarPorAno(): void
    {
        const ano = parseInt(String(this.buscarAno), 10);
        if (isNaN(ano))
        {
            this.ngxToast.alertaToast('Introduce un año a cuatro digitos', 'Valor numerico requerido');
            return;
        }
        this.filtrarPorAno.emit(this.buscarAno);
    }

    trackByCentroGestor(index: number, elemento: string): number | string
    {
        return index || elemento;
    }

    trackByEmpleado(index: number, elemento: IResolveEmpleado): number | string
    {
        return index || elemento._id;
    }
}
