import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ModAvancesPbrComponent} from '@s-general/pbr-usuario/mod-avances-pbr/mod-avances-pbr.component';
import {fuseAnimations} from '@s-fuse/public-api';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {actCuestionario, ngxLoaderPbr, PlaneacionService, ValoresCamposMod} from '@s-dir-general/store/planeacion.service';
import {CalculosPipePbr} from '@s-dir-general/pbr/pipes/calculosPbr.pipe';
import {ConfirmacionService} from '@s-services/confirmacion.service';
import {abrirPanelPbr} from "@s-dir-general/pbr/pbr.component";
import {ListaSumPbrComponent} from "@s-dir-general/mir/lista-tab-mir/lista-sum-pbr/lista-sum-pbr.component";
import {MatButtonToggleChange, MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatExpansionModule} from "@angular/material/expansion";
import {isNil} from "@angular-ru/cdk/utils";
import {DefaultValuePipeModule, NumberFormatPipeModule} from "@angular-ru/cdk/pipes";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-lista-pbr',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTabsModule, MatButtonModule, MatIconModule, NgxUiLoaderModule, MatInputModule, MatSidenavModule, CalculosPipePbr,
        ListaSumPbrComponent, MatButtonToggleModule, MatExpansionModule, DefaultValuePipeModule, DefaultValuePipeModule, NumberFormatPipeModule],
    templateUrl: './lista-pbr.component.html',
    styleUrls: ['./lista-pbr.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListaPbrComponent
{
    @Input() desNuevoReg: boolean = false;
    @Input() desEditarReg: boolean = false;
    @Input() desEliminarReg: boolean = false;
    @Input() desSumatoria: boolean = false;

    loader = ngxLoaderPbr();
    cuestionariosPbr = this.planeacionQuery.compCuestionarioPbr;
    elementoPbr = this.planeacionQuery.cuestionarioPbr;

    constructor(private mdr: MatDialog, public planeacionQuery: PlaneacionQuery, private confirmacionService: ConfirmacionService, private planeacionService: PlaneacionService,
                private ngxToast: ToastrService)
    {
    }

    cambioDeSeleccion(e: MatButtonToggleChange): void
    {
        this.planeacionQuery.cuestionarioPbr.set(e.value);
    }

    editarPbr(): void
    {
        if (this.validarElemPbr())
        {
            return;
        }
        actCuestionario(true);
        abrirPanelPbr.set(true);
    }

    regAvances(): void
    {
        if (this.validarElemPbr())
        {
            return;
        }
        this.mdr.open(ModAvancesPbrComponent, {width: '40%'});
    }

    nvoElemento(): void
    {
        actCuestionario(false);
        abrirPanelPbr.set(true);
    }

    trackByFn(index: number): number
    {
        return index;
    }

    eliminarPbr(): void
    {
        if (this.validarElemPbr())
        {
            return;
        }
        this.planeacionService.eliminarElemento(this.elementoPbr().idIndicador, ValoresCamposMod.pbrCuestionario);
    }

    validarElemPbr(): boolean
    {
        if (isNil(this.elementoPbr()))
        {
            this.ngxToast.warning('No hay elemento Seleccionado', 'PBR');
            return true
        }
        return false;
    }
}
