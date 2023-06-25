import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccionesMirPbrComponent} from '@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {fuseAnimations} from '@s-fuse/public-api';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {ConfirmacionService} from '@s-services/confirmacion.service';
import {isNil} from '@angular-ru/cdk/utils';
import {PlaneacionService} from '@s-dir-general/store/planeacion.service';
import {TReemplazarComp} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {TablaMatComponent} from '@s-shared/components/tabla-mat/tabla-mat.component';
import {finalize} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {DateTime} from 'luxon';
import {MultiplesFormatosPipe} from "@s-shared/pipes/multiples-formatos.pipe";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {IGenerarColumnTabla} from "#/libs/models/src/lib/tabla.interface";
import {ComponentesService, IDatosFormulario, PrefFormDin} from "@s-dir-general/componentes/services/componentes.service";
import {IMirCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface";
import {NgxUiLoaderModule, NgxUiLoaderService} from "ngx-ui-loader";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {TablaComponenteService} from "@s-dir-general/componentes/services/tabla-componente.service";
import {TiposFormulario} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {isEqual, pullAllWith} from "lodash-es";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";

@Component({
    selector: 'app-componentes',
    standalone: true,
    imports: [CommonModule, AccionesMirPbrComponent, MatListModule, MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, TablaMatComponent, MultiplesFormatosPipe,
        MatCheckboxModule, NgxUiLoaderModule, FormsModule, ReactiveFormsModule],
    templateUrl: './componentes.component.html',
    styleUrls: ['./componentes.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentesComponent
{
    @ViewChild('componente', {static: false}) componenteRef!: ElementRef;
    @Output() avancesTrim = new EventEmitter<string[]>();
    protected readonly PrefFormDin = PrefFormDin;
    ngxLoader = 'loaderComponentes';
    avTrim: string[] = ['', '', '', ''];
    fecha = DateTime.now().toLocaleString();
    chkVisible: boolean[] = [false, false, false, false];
    datosTabla = new MatTableDataSource<IDatosFormulario>([]);

    chkTrim0 = new FormControl(false);
    chkTrim1 = new FormControl(false);
    chkTrim2 = new FormControl(false);
    chkTrim3 = new FormControl(false);

    columnas: IGenerarColumnTabla[] = [];

    constructor(public planeacionQuery: PlaneacionQuery, private confirmacionService: ConfirmacionService, private planeacionService: PlaneacionService, private router: Router, private cdr: ChangeDetectorRef,
                private activatedRoute: ActivatedRoute, private componentesService: ComponentesService, private ngxUiLoaderService: NgxUiLoaderService)
    {
        effect(() =>
        {
            const mir = this.planeacionQuery.cuestionarioMir();
            if (isNil(mir) || isNil(mir.componente))
            {
                this.avTrim = [...['0', '0', '0', '0']];
                this.avancesTrim.emit([...this.avTrim]);
                return;
            }
            const trimObjCalcular = this.componentesService.objParaLaFormula(mir, planeacionQuery.getActive());
            this.chkTrim0.reset();
            this.chkTrim1.reset();
            this.chkTrim2.reset();
            this.chkTrim3.reset();
            this.chkVisible = [false, false, false, false];
            const tituloEnArray = mir.componente.colsTabla[0].split('__');
            const etiqueta = tituloEnArray.shift();
            const def = tituloEnArray.pop();
            const colsBase: IGenerarColumnTabla[] = TablaComponenteService.genCols([etiqueta, 'Descripcion'], [PrefFormDin.idIndicador + def, PrefFormDin.dato + def], ['10%', 'auto'], 'texto');
            this.columnas = [...colsBase];
            this.avTrim[0] = this.componentesService.calcAvances(mir.componente.formula, trimObjCalcular[0]);
            this.avTrim[1] = this.componentesService.calcAvances(mir.componente.formula, trimObjCalcular[1]);
            this.avTrim[2] = this.componentesService.calcAvances(mir.componente.formula, trimObjCalcular[2]);
            this.avTrim[3] = this.componentesService.calcAvances(mir.componente.formula, trimObjCalcular[3]);
            this.datosTabla.data = this.componentesService.datosTablaDinamica(mir, planeacionQuery.getActive());
            this.avancesTrim.emit(this.avTrim);
        });
    }

    nuevoComponente(): void
    {
        const mir = this.planeacionQuery.cuestionarioMir();
        const _id = this.planeacionQuery.getActive()._id;

        if (isNil(mir.componente))
        {
            this.router.navigate(['registro-componente', _id, mir.idIndicador], {relativeTo: this.activatedRoute}).then();
        } else
        {
            const message = 'Ya existe un componente para este indicador, si deseas reemplazar este componente confirma que deseas hacerlo';
            this.confirmacionService.abrir({message, title: 'Reemplazar componente'}).afterClosed().subscribe(res =>
            {
                if (res === 'confirmed')
                {
                    const args: TReemplazarComp =
                        {
                            _id: this.planeacionQuery.getActive()._id,
                            idIndicador: mir.idIndicador
                        };
                    this.planeacionService.reemplazarComp(args).pipe(finalize(() => this.router.navigate(['registro-componente', _id, mir.idIndicador],
                        {relativeTo: this.activatedRoute}).then())).subscribe();
                }
            });
        }
    }

    imprimirComp(mirSelec: IMirCuestionario): void
    {
        this.ngxUiLoaderService.startLoader(this.ngxLoader);
        const componente = this.componenteRef.nativeElement;
        componente.style.color = 'black';
        html2canvas(componente).then(canvas =>
        {
            const img = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'pt', 'a4');
            pdf.addImage('assets/images/logo/presidencia.png', 'png', 10, 10, 28, 28, 'logo', 'FAST');
            pdf.setFontSize(8);
            pdf.text('SISTEMA MUNICIPAL DE AGUA POTABLE, ALCATARILLADO Y SANEAMIENTO DE DOLORES HIDALGO, GUANAJUATO(SIMAPAS)', pdf.internal.pageSize.width / 2, 20, {align: 'center'});
            const imgProps = pdf.getImageProperties(img);
            const pdfAncho = pdf.internal.pageSize.getWidth();
            const pdfAlto = (imgProps.height * pdfAncho) / imgProps.width;
            pdf.addImage(img, 'PNG', 0, 40, pdfAncho, pdfAlto);
            pdf.line(10, pdfAlto + 50, pdfAncho - 20, pdfAlto + 50);
            pdf.text(mirSelec.responsable, pdfAncho - 100, pdfAlto + 130, {align: 'right', baseline: 'middle', renderingMode: 'fill'});
            pdf.save('componente.pdf');
            componente.style.color = '';
            this.ngxUiLoaderService.stopLoader(this.ngxLoader);
        });
    }

    cambioChkTrim(e: MatCheckboxChange, trim: PrefFormDin, trimAnt: PrefFormDin, suf: string, sufAnt: string): void
    {
        const mir = this.planeacionQuery.cuestionarioMir();
        //Obtenemos el último caracter del ID asignando a cada checkbox para usarlo como índice del array que mostrara los avances trimestrales en el html
        this.chkVisible[parseInt(e.source.id.charAt(e.source.id.length - 1), 10)] = e.checked;
        mir.componente.colsTabla.forEach((col, indice) =>
        {
            const colArray = col.split('__');
            const etiqueta = colArray.shift();
            const idDinamico = colArray.pop();
            if (indice === 0 && mir.componente.omitirPrimerId)
            {
                return;
            }
            const cols = TablaComponenteService.genCols([etiqueta + suf], [trim + idDinamico], ['10%'], mir.componente.tipoValorTrim);
            const colsPeriodoAnt = TablaComponenteService.genCols([etiqueta + sufAnt,], [trimAnt + idDinamico], ['10%'], mir.componente.tipoValorTrim);

            const formConfig =
                {
                    [TiposFormulario.DIN]: cols,
                    [TiposFormulario.PERIODO_ANT]: cols.concat(colsPeriodoAnt)
                }
            const colsAgregar = formConfig[mir.componente.tipoForm];
            e.checked ? this.columnas = [...this.columnas].concat(colsAgregar) : this.columnas = pullAllWith([...this.columnas], colsAgregar, isEqual);
        });
    }
}
