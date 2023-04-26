import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { fuseAnimations } from '@s-fuse/public-api';
import { FormsModule } from '@angular/forms';
import { actualizarMir, ngxLoaderMir, PlaneacionService } from '@s-dir-general/store/planeacion.service';
import { PlaneacionQuery } from '@s-dir-general/store/planeacion.query';
import { ConfirmacionService } from '@s-services/confirmacion.service';
import { TEliminarElementoMir } from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';

@Component({
    selector: 'app-lista-tab-mir',
    standalone: true,
    imports: [CommonModule, MatTabsModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, NgxUiLoaderModule, FormsModule],
    providers: [],
    templateUrl: './lista-tab-mir.component.html',
    styleUrls: ['./lista-tab-mir.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaTabMirComponent
{
    @Output() abrirPanel = new EventEmitter<boolean>();
    loader = ngxLoaderMir();
    indice = 0;

    constructor(public planeacionQuery: PlaneacionQuery, private confirmacionService: ConfirmacionService, private planeacionService: PlaneacionService)
    {
    }

    trackByFn(index: number): string | number
    {
        return index;
    }

    nuevoElemento()
    {
        actualizarMir([false, this.indice]);
        this.abrirPanel.emit(true);
    }

    editarRegistro(): void
    {
        actualizarMir([true, this.indice]);
        this.abrirPanel.emit(true);
    }

    eliminarReg(): void
    {
        this.confirmacionService.abrir().afterClosed().subscribe((res) =>
        {
            if (res === 'confirmed')
            {
                const args: TEliminarElementoMir =
                    {
                        _id: this.planeacionQuery.getActive()._id,
                        idIndicador: this.planeacionQuery.getActive().mirCuestionario[this.indice].idIndicador
                    };
                this.planeacionService.eliminarElementoMir(args).subscribe();
            }
        });
    }

    cambioDeIndiceMir(e: number): void
    {
        this.indice = e;
    }
}
