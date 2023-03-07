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
import {isNil, isNotNil} from "@angular-ru/cdk/utils";

export interface IBuscarEmpleado
{
    ano: number;
    centroGestor: string;
    idEmpleado: string;
}

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
    @Output() porAno = new EventEmitter<number>();
    @Output() porCentroGestor = new EventEmitter<[string, number]>();
    @Output() porEmpleado = new EventEmitter<[string, string, number]>();
    @Input() habEmpleado = false;
    @Input() habCentroGestor = false;
    buscarAno: number = new Date().getFullYear();
    bCentroGestor: string;

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
        this.porCentroGestor.emit([e, ano]);
    }

    buscarPorAno(): void
    {
        const ano = parseInt(String(this.buscarAno), 10);
        if (isNaN(ano))
        {
            this.ngxToast.alertaToast('Introduce un año a cuatro digitos', 'Valor numerico requerido');
            return;
        }
        this.porAno.emit(this.buscarAno);
    }

    buscarEmpleado(e: string): void
    {
        if (isNil(this.bCentroGestor) || isNil(this.buscarAno))
        {
            this.ngxToast.alertaToast('Es necesario seleccionar un centro gestor y año', 'Centro gestor');
            return;
        }
        this.porEmpleado.emit([this.bCentroGestor, e, this.buscarAno]);
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
