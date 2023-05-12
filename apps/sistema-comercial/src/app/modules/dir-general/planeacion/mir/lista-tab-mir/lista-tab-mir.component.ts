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
import {ComponentesComponent} from "@s-dir-general/componentes/componentes.component";
import {MatButtonToggleChange, MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {IMirCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface";
import {MatExpansionModule} from "@angular/material/expansion";
import {isNil} from "@angular-ru/cdk/utils";

@Component({
    selector: 'app-lista-tab-mir',
    standalone: true,
    imports: [CommonModule, MatTabsModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, NgxUiLoaderModule, FormsModule, MatTooltipModule,
        ComponentesComponent, MatButtonToggleModule, MatGridListModule, MatDividerModule, MatExpansionModule],
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
    elementoMir: IMirCuestionario = null;

    constructor(public planeacionQuery: PlaneacionQuery, private confirmacionService: ConfirmacionService, private planeacionService: PlaneacionService, private ngxToast: NgxToastService)
    {
    }

    @Input({required: true}) set planeacion(valor: IPlaneacion)
    {
        this._planeacion = valor;
    }

    cambioDeSeleccion(e: MatButtonToggleChange): void
    {
        this.elementoMir = e.value;
    }

    nuevoElemento(): void
    {
        actualizarMir([false, null]);
        abrirPanelMir.set(true)
    }

    editarRegistro(): void
    {
        this.validacionesParaLista();
        actualizarMir([true, this.elementoMir.idIndicador]);
        abrirPanelMir.set(true);
    }

    eliminarReg(): void
    {
        this.validacionesParaLista();
        this.planeacionService.eliminarElemento(this.elementoMir.idIndicador, ValoresCamposMod.mirCuestionario);
    }

    imprimirMir(): void
    {
        this.validacionesParaLista();
    }

    validacionesParaLista(): void
    {
        if (this._planeacion.mirCuestionario.length === 0)
        {
            this.ngxToast.alertaToast('No hay elementos que editar por el momento', 'MIR');
            return;
        }
        if (isNil(this.elementoMir))
        {
            this.ngxToast.alertaToast('Selecciona un elemento de la lista superior', 'MIR');
            return;
        }
    }

    trackByFn(index: number): number
    {
        return index;
    }
}
