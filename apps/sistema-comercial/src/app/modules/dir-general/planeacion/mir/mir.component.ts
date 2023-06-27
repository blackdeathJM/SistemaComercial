import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModMirComponent} from '@s-dir-general/mir/mod-mir/mod-mir.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ModMultiplesSeleccionesComponent} from '@s-dir-general/mod-multiples-selecciones/mod-multiples-selecciones.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ListaTabMirComponent} from '@s-dir-general/mir/lista-tab-mir/lista-tab-mir.component';
import {AccionesMirPbrComponent} from '@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component';
import {ModInicialzarRegistroComponent} from '@s-dir-general/mod-inicialzar-registro/mod-inicialzar-registro.component';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {fuseAnimations} from '@s-fuse/public-api';
import {ComponentesComponent} from '@s-dir-general/componentes/componentes.component';
import {$cast, isNil} from '@angular-ru/cdk/utils';
import {ComponentesService} from '@s-dir-general/componentes/services/componentes.service';
import {NgxToastService} from "@s-services/ngx-toast.service";
import {PlaneacionImprimirService} from "@s-dir-general/services/planeacion-imprimir.service";
import {IMirCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface";
import {CellHook, CellHookData, ColumnInput, Styles} from "jspdf-autotable";
import {STYLES} from "@s-dir-general/models/pdf-imprimir";

@Component({
    selector: 'app-mir',
    standalone: true,
    imports: [CommonModule, MatSidenavModule, AccionesMirPbrComponent, ModMirComponent, MatButtonToggleModule, MatIconModule, ListaTabMirComponent, ComponentesComponent],
    providers: [],
    templateUrl: './mir.component.html',
    animations: [fuseAnimations],
    styleUrls: ['./mir.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MirComponent implements OnDestroy
{
    abrirPanel = false;
    avancesTrimestrales: string[] = [];
    const
    estilos: Partial<Styles> = STYLES;

    constructor(public mdr: MatDialog, public planeacionQuery: PlaneacionQuery, private componentesService: ComponentesService, private ngxToast: NgxToastService)
    {
    }

    regSeleccion(): void
    {
        this.mdr.open(ModMultiplesSeleccionesComponent, {width: '70%'});
    }

    inicializarPlaneacion(): void
    {
        this.mdr.open(ModInicialzarRegistroComponent, {width: '40%'});
    }

    imprimirTablaMir(): void
    {
        if (isNil(this.planeacionQuery.getActive()))
        {
            this.ngxToast.alertaToast('Selecciona un año para poder continuar', 'MIR');
            return;
        }

        const columnas: ColumnInput[] = [{header: 'Ind', dataKey: 'idIndicador'}, {header: 'Nivel', dataKey: 'nivel'}, {header: 'Resumen narrativo', dataKey: 'resumenNarrativo'},
            {header: 'Centro gestor', dataKey: 'centroGestor'}, {header: 'Metodo de calculo', dataKey: 'metodoCalculo'}, {header: 'Medios de verificacion', dataKey: 'mediosVerificacion'},
            {header: 'U. Medida', dataKey: 'unidadDeMedida'}, {header: 'L.B Año', dataKey: 'lineaBaseAno'}, {header: 'L.B. valor', dataKey: 'lineaBaseValor'}, {header: 'Meta', dataKey: 'meta'},
            {header: 'Sentido Ind', dataKey: 'sentidoDelIndicador'}, {header: 'Sem. Verde', dataKey: 'semefVerdeV'}, {header: 'Sem. Ama', dataKey: 'semefAmarilloV'}, {header: 'Sem. Rojo', dataKey: 'semefRojoV'},
            {header: 'A. Trim1', dataKey: 'avanceTrim1'}, {header: 'A. Trim2', dataKey: 'avanceTrim2'}, {header: 'A. Trim3', dataKey: 'avanceTrim3'}, {header: 'A. Trim4', dataKey: 'avanceTrim4'},
            {header: 'Glob', dataKey: 'avanceAnual'}];

        const columnStyles: { [p: string]: Partial<Styles> } = {
            resumenNarrativo: {cellWidth: 45},
            centroGestor: {cellWidth: 20},
            metodoCalculo: {cellWidth: 45},
            mediosVerificacion: {cellWidth: 30},
            supuestos: {cellWidth: 30},
            unidadDeMedida: {cellWidth: 15},
        };
        const subtitulo = 'FICHA TECNICA DEL INDICADOR ' + this.planeacionQuery.getActive().ano;
        const didParseCell: CellHook = ((data: CellHookData) =>
        {
            if (data.section === 'body')
            {
                const mir = $cast<IMirCuestionario>(data.row.raw);
                if (mir)
                {
                    if (mir.componente && mir.componente.formula)
                    {
                        const objParaFormula = this.componentesService.objParaLaFormula(mir, this.planeacionQuery.getActive());
                        const trimestres = [this.componentesService.calcAvances(mir.componente.formula, objParaFormula[0]), this.componentesService.calcAvances(mir.componente.formula, objParaFormula[1]),
                            this.componentesService.calcAvances(mir.componente.formula, objParaFormula[2]), this.componentesService.calcAvances(mir.componente.formula, objParaFormula[3])]
                        data.row.cells.avanceTrim1.text = [trimestres[0].toString()];
                        data.row.cells.avanceTrim2.text = [trimestres[1].toString()];
                        data.row.cells.avanceTrim3.text = [trimestres[2].toString()];
                        data.row.cells.avanceTrim4.text = [trimestres[3].toString()];
                        const sumar = parseFloat(trimestres[0]) + parseFloat(trimestres[1]) + parseFloat(trimestres[2]) + parseFloat(trimestres[3]);
                        data.row.cells.avanceAnual.text = [sumar.toString()];
                    }
                }
            }
        });

        PlaneacionImprimirService.imprimirTabla(columnas, this.estilos, columnStyles, this.planeacionQuery.compCuestionarioMir(), subtitulo, didParseCell);
    }

    avancesTrim(e: string[]): void
    {
        this.avancesTrimestrales = e;
    }

    panelMirLista(e: boolean): void
    {
        this.abrirPanel = e;
    }

    ngOnDestroy(): void
    {
        this.abrirPanel = false;
        this.planeacionQuery.centroGestor.set(null);
        this.planeacionQuery.cuestionarioMir.set(null);
        this.planeacionQuery.cuestionarioMirV.set([]);
    }
}
