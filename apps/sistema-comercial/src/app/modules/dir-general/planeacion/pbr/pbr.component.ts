import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccionesMirPbrComponent} from '@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ModPbrComponent} from '@s-dir-general/pbr/mod-pbr/mod-pbr.component';
import {MatListModule} from '@angular/material/list';
import {ListaPbrComponent} from '@s-dir-general/pbr/lista-pbr/lista-pbr.component';
import {MatButtonModule} from '@angular/material/button';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {PlaneacionStore} from '@s-dir-general/store/planeacion.store';
import {ListaSumPbrComponent} from "@s-dir-general/mir/lista-tab-mir/lista-sum-pbr/lista-sum-pbr.component";
import {MatDialog} from "@angular/material/dialog";
import {ModSumatoriasComponent} from "@s-dir-general/mir/mod-sumatorias/mod-sumatorias.component";
import {IEditarSumatoriaPBR} from "@s-dir-general/store/planeacion.interface";
import {fuseAnimations} from "@s-fuse/public-api";
import {isNil} from "@angular-ru/cdk/utils";
import {ToastrService} from "ngx-toastr";
import {CellHook, CellHookData, ColumnInput, Styles} from "jspdf-autotable";
import {STYLES} from "@s-dir-general/models/pdf-imprimir";
import {PlaneacionImprimirService} from "@s-dir-general/services/planeacion-imprimir.service";

@Component({
    selector: 'app-pbr',
    standalone: true,
    imports: [CommonModule, AccionesMirPbrComponent, MatButtonToggleModule, MatIconModule, MatSidenavModule, ModPbrComponent, MatListModule,
        ListaPbrComponent, MatButtonModule, ListaSumPbrComponent],
    templateUrl: './pbr.component.html',
    styleUrls: ['./pbr.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PbrComponent implements OnDestroy
{
    abrirPanelPbr = false;
    pbrSumatorias = this.planeacionQuery.compSumatoriasPbr;
    estilos: Partial<Styles> = STYLES;

    constructor(private planeacionStore: PlaneacionStore, public planeacionQuery: PlaneacionQuery, private toastrService: ToastrService, private mdr: MatDialog)
    {

    }

    sumatoria(): void
    {
        if (!this.planeacionQuery.getActive())
        {
            this.toastrService.warning('Debes seleccionar el año del ejercicio', 'Sumatorias');
            return;
        }
        const data: IEditarSumatoriaPBR =
            {
                idSumatoria: null,
                actualizar: false
            }
        this.mdr.open(ModSumatoriasComponent, {width: '40%', data, hasBackdrop: false, disableClose: true});
    }

    panelPbr(e: boolean): void
    {
        this.abrirPanelPbr = e;
    }

    panelPbrDeLista(e: boolean): void
    {
        this.abrirPanelPbr = e;
    }

    imprimirTablaPbr(): void
    {
        if (isNil(this.planeacionQuery.getActive()))
        {
            this.toastrService.warning('Selecciona un año para poder continuar', 'PBR');
        }

        const columnasPbr: ColumnInput[] = [{header: 'Indicador', dataKey: 'idIndicador'}, {header: 'V. Origen', dataKey: 'variableOrigen'}, {header: 'Dato', dataKey: 'dato'}, {header: 'unidad', dataKey: 'unidad'},
            {header: 'descripcion', dataKey: 'descripcion'}, {header: 'Ene', dataKey: 'enero'}, {header: 'Feb', dataKey: 'febrero'}, {header: 'Mar', dataKey: 'marzo', key: 'marzo'}, {header: 'Trim-1', dataKey: 'trim1'},
            {header: 'Abr', dataKey: 'abril'}, {header: 'May', dataKey: 'mayo'}, {header: 'Jun', dataKey: 'junio'}, {header: 'Trim-2', dataKey: 'trim2'},
            {header: 'Jul', dataKey: 'julio'}, {header: 'Ago', dataKey: 'agosto'}, {header: 'Sep', dataKey: 'septiembre'}, {header: 'Trim-3', dataKey: 'trim3'},
            {header: 'Oct', dataKey: 'octubre'}, {header: 'Nov', dataKey: 'noviembre'}, {header: 'Dic', dataKey: 'diciembre'}, {header: 'Trim-4', dataKey: 'trim4'}, {header: 'Total', dataKey: 'total'}];

        const columnStyles: { [p: string]: Partial<Styles> } =
            {
                idIndicador: {cellWidth: 20},
                variableOrigen: {cellWidth: 10},
                dato: {cellWidth: 50},
                unidad: {cellWidth: 20},
                descripcion: {cellWidth: 'auto'},
                enero: {cellWidth: 9.5},
                febrero: {cellWidth: 9.5},
                marzo: {cellWidth: 9.5},
                trim1: {cellWidth: 9.5},
                abril: {cellWidth: 9.5},
                mayo: {cellWidth: 9.5},
                junio: {cellWidth: 9.5},
                trim2: {cellWidth: 9.5},
                julio: {cellWidth: 9.5},
                agosto: {cellWidth: 9.5},
                septiembre: {cellWidth: 9.5},
                trim3: {cellWidth: 9.5},
                octubre: {cellWidth: 9.5},
                noviembre: {cellWidth: 9.5},
                diciembre: {cellWidth: 9.5},
                trim4: {cellWidth: 9.5},
                total: {cellWidth: 9.5}
            };
        const subtitulo = 'PRESUPUESTO BASADO EN RESULTADOS ' + this.planeacionQuery.getActive().ano;
        const didParseCell: CellHook = ((data: CellHookData) =>
        {

        });

        PlaneacionImprimirService.imprimirTabla(columnasPbr, this.estilos, columnStyles, this.planeacionQuery.compCuestionarioPbr(), subtitulo, didParseCell);
    }

    ngOnDestroy(): void
    {
        this.planeacionQuery.centroGestor.set(null);
        this.planeacionQuery.cuestionarioPbr.set(null);
        this.planeacionQuery.cuestionarioPbrV.set([]);
    }
}
