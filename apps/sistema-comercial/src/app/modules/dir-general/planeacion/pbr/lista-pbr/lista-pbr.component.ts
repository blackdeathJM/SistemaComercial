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
import {actualizarPbr, avancesPbr, ngxLoaderPbr, PlaneacionService, ValoresCamposMod} from '@s-dir-general/store/planeacion.service';
import {CalculosPipePbr} from '@s-dir-general/pbr/pipes/calculosPbr.pipe';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {ConfirmacionService} from '@s-services/confirmacion.service';
import {abrirPanelPbr} from "@s-dir-general/pbr/pbr.component";
import {ListaSumPbrComponent} from "@s-dir-general/mir/lista-tab-mir/lista-sum-pbr/lista-sum-pbr.component";
import {isNil} from "@angular-ru/cdk/utils";
import {NgxToastService} from "@s-services/ngx-toast.service";

@Component({
    selector: 'app-lista-pbr',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTabsModule, MatButtonModule, MatIconModule, NgxUiLoaderModule, MatInputModule, MatSidenavModule, CalculosPipePbr, ListaSumPbrComponent],
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

    _planeacion: IPlaneacion = null;
    indice = 0;
    loader = ngxLoaderPbr();

    constructor(private mdr: MatDialog, public planeacionQuery: PlaneacionQuery, private confirmacionService: ConfirmacionService, private planeacionService: PlaneacionService,
                private ngxToast: NgxToastService)
    {
    }

    @Input({required: true}) set planeacion(valor: IPlaneacion)
    {
        this._planeacion = valor;
    }

    regAvances(): void
    {
        avancesPbr([this._planeacion._id, this.indice]);
        this.mdr.open(ModAvancesPbrComponent, {width: '40%'});
    }

    abrirPanel(): void
    {
        actualizarPbr([false, this.indice]);
        abrirPanelPbr.set(true);
    }

    cambioIndicePbr(e: number): void
    {
        this.indice = e;
    }

    editarPbr(): void
    {
        if (this.planeacionQuery.getActive().pbrCuestionario.length === 0)
        {
            this.ngxToast.alertaToast('No hay elemento que puedas editar', 'Editar elementos');
            return;
        }
        actualizarPbr([true, this.indice]);
        abrirPanelPbr.set(true);
    }

    trackByFn(index: number): number
    {
        return index;
    }

    eliminarPbr(): void
    {
        if (this.planeacionQuery.getActive().pbrCuestionario.length === 0)
        {
            this.ngxToast.alertaToast('No hay elemento que puedas eliminar', 'Eliminar elemento');
            return;
        }
        // this.planeacionService.eliminarElemento(this.indice, ValoresCamposMod.pbrCuestionario);
    }
}
