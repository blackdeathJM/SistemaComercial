import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {fuseAnimations} from '@s-fuse/public-api';
import {FormsModule} from '@angular/forms';
import {actualizarMir, ngxLoaderMir, PlaneacionService, ValoresCamposMod} from '@s-dir-general/store/planeacion.service';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {ConfirmacionService} from '@s-services/confirmacion.service';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgxToastService} from "@s-services/ngx-toast.service";
import {abrirPanelMir} from "@s-dir-general/mir/mir.component";
import {IMirCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface";
import {ComponentesComponent} from "@s-dir-general/componentes/componentes.component";

@Component({
    selector: 'app-lista-tab-mir',
    standalone: true,
    imports: [CommonModule, MatTabsModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, NgxUiLoaderModule, FormsModule, MatTooltipModule,
        ComponentesComponent],
    providers: [],
    templateUrl: './lista-tab-mir.component.html',
    styleUrls: ['./lista-tab-mir.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaTabMirComponent
{
    loader = ngxLoaderMir();
    indice = 0;
    _planeacion: IPlaneacion = null;
    mirCuestionarioComponente: IMirCuestionario = null;

    constructor(public planeacionQuery: PlaneacionQuery, private confirmacionService: ConfirmacionService, private planeacionService: PlaneacionService, private ngxToast: NgxToastService)
    {
    }

    @Input() set planeacion(valor: IPlaneacion)
    {
        this._planeacion = valor;
    }

    cambioDeIndiceMir(e: number): void
    {
        this.indice = e;
    }

    nuevoElemento(): void
    {
        actualizarMir([false, this.indice]);
        abrirPanelMir.set(true)
    }

    editarRegistro(): void
    {
        if (this._planeacion.mirCuestionario.length === 0)
        {
            this.ngxToast.alertaToast('No hay elementos que editar por el momento', 'Actualizar MIR');
            return;
        }
        actualizarMir([true, this.indice]);
        abrirPanelMir.set(true);
    }

    eliminarReg(): void
    {
        if (this._planeacion.mirCuestionario.length === 0)
        {
            this.ngxToast.alertaToast('No hay elementos que eliminar por el momento', 'Eliminar MIR');
            return;
        }
        this.planeacionService.eliminarElemento(this.indice, ValoresCamposMod.mirCuestionario);
    }

    imprimirMir(): void
    {
        if (this._planeacion.mirCuestionario.length === 0)
        {
            this.ngxToast.alertaToast('No hay elementos para imprimir por el momento', 'Eliminar MIR');
            return;
        }
    }

    trackByFn(index: number): string | number
    {
        return index;
    }
}
