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
import {actCuestionario, ngxLoaderMir, PlaneacionService, ValoresCamposMod} from '@s-dir-general/store/planeacion.service';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {ConfirmacionService} from '@s-services/confirmacion.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {abrirPanelMir} from '@s-dir-general/mir/mir.component';
import {ComponentesComponent} from '@s-dir-general/componentes/componentes.component';
import {MatButtonToggleChange, MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {isNil} from '@angular-ru/cdk/utils';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {IMirCuestionario} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface';
import {MultiplesFormatosPipe} from "@s-shared/pipes/multiples-formatos.pipe";

@Component({
    selector: 'app-lista-tab-mir',
    standalone: true,
    imports: [CommonModule, MatTabsModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, NgxUiLoaderModule, FormsModule, MatTooltipModule,
        ComponentesComponent, MatButtonToggleModule, MatGridListModule, MatDividerModule, MatExpansionModule, MultiplesFormatosPipe],
    providers: [],
    templateUrl: './lista-tab-mir.component.html',
    styleUrls: ['./lista-tab-mir.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaTabMirComponent
{
    loader = ngxLoaderMir();
    indice: number;
    _avancesTrimestrales: string[] = ['', '', '', ''];
    @Input({required: true}) set avancesTrimestrales(v: string[])
    {
        this._avancesTrimestrales = v;
    }

    constructor(public planeacionQuery: PlaneacionQuery, private confirmacionService: ConfirmacionService, private planeacionService: PlaneacionService,
                private ngxToast: NgxToastService)
    {
    }

    cambioDeSeleccion(e: MatButtonToggleChange, i: number): void
    {
        this.indice = i;
        const cuestionarioMir = e.value as IMirCuestionario;
        this.planeacionQuery.cuestionarioMir.set(cuestionarioMir);
    }

    nuevoElemento(): void
    {
        actCuestionario(false);
        abrirPanelMir.set(true)
    }

    editarRegistro(): void
    {
        if (this.validarMir())
        {
            return;
        }
        actCuestionario(true);
        abrirPanelMir.set(true);
    }

    eliminarReg(): void
    {
        if (this.validarMir())
        {
            return;
        }
        this.planeacionService.eliminarElemento(this.planeacionQuery.cuestionarioMir().idIndicador, ValoresCamposMod.mirCuestionario);
    }

    validarMir(): boolean
    {
        if (isNil(this.planeacionQuery.cuestionarioMir()))
        {
            this.ngxToast.alertaToast('No hay elemento seleccionado para poder continuar', 'PBR')
            return true;
        }
        return false;
    }

    cambiarDireccion(dir: string): void
    {
        const arregloMir = this.planeacionQuery.compCuestionarioMir();
        if (dir === 'siguiente' && this.indice < arregloMir.length - 1)
        {
            this.indice++;
        }
        if (dir === 'anterior' && this.indice > 0)
        {
            this.indice--;
        }
        this.planeacionQuery.cuestionarioMir.set(arregloMir[this.indice]);
    }

    trackByFn(index: number): number
    {
        return index;
    }
}
