import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {fuseAnimations} from '@s-fuse/public-api';
import {NgxUiLoaderModule, NgxUiLoaderService} from 'ngx-ui-loader';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {CalculosPipePbr} from '@s-dir-general/pbr/pipes/calculosPbr.pipe';
import {ListaSumPbrComponent} from "@s-dir-general/mir/lista-tab-mir/lista-sum-pbr/lista-sum-pbr.component";
import {MatButtonToggleChange, MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatExpansionModule} from "@angular/material/expansion";
import {DefaultValuePipeModule} from "@angular-ru/cdk/pipes";
import {MatDialog} from "@angular/material/dialog";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {ConfirmacionService} from "@s-services/confirmacion.service";
import {actCuestionario, ngxLoaderPbr, PlaneacionService, ValoresCamposMod} from "@s-dir-general/store/planeacion.service";
import {ToastrService} from "ngx-toastr";
import {ModAvancesPbrComponent} from "@s-general/pbr-usuario/mod-avances-pbr/mod-avances-pbr.component";
import {isNil} from "@angular-ru/cdk/utils";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import {DateTime} from "luxon";

@Component({
    selector: 'app-lista-pbr',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTabsModule, MatButtonModule, MatIconModule, NgxUiLoaderModule, MatInputModule, MatSidenavModule, CalculosPipePbr,
        ListaSumPbrComponent, MatButtonToggleModule, MatExpansionModule, DefaultValuePipeModule],
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

    @Output() panelPbr = new EventEmitter<boolean>();

    @ViewChild('pbrImprimir', {static: false}) pbrImprimirRef!: ElementRef;
    loader = ngxLoaderPbr();
    cuestionariosPbr = this.planeacionQuery.compCuestionarioPbr;
    elementoPbr = this.planeacionQuery.cuestionarioPbr;

    indice: number;

    constructor(private mdr: MatDialog, public planeacionQuery: PlaneacionQuery, private confirmacionService: ConfirmacionService, private planeacionService: PlaneacionService, private ngxUiLoaderService: NgxUiLoaderService,
                private ngxToast: ToastrService)
    {
    }

    cambioDeSeleccion(e: MatButtonToggleChange, i: number): void
    {
        this.planeacionQuery.cuestionarioPbr.set(e.value);
        this.indice = i;
    }

    editarPbr(): void
    {
        if (this.validarElemPbr())
        {
            return;
        }
        actCuestionario(true);
        this.panelPbr.emit(true);
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
        this.panelPbr.emit(true);
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

    cambiarDireccion(direccion: string): void
    {
        const arreglo = this.cuestionariosPbr();
        if (direccion === 'siguiente' && this.indice < arreglo.length - 1)
        {
            this.indice++;
        }

        if (direccion === 'anterior' && this.indice > 0)
        {
            this.indice--;
        }
        this.planeacionQuery.cuestionarioPbr.set(arreglo[this.indice]);
    }

    imprimirPbr(): void
    {
        this.ngxUiLoaderService.startLoader(this.loader);
        const pbrRef = this.pbrImprimirRef.nativeElement;
        pbrRef.style.color = 'black';
        html2canvas(pbrRef).then(canvas =>
        {
            const img = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'pt', 'a4');
            pdf.addImage('assets/images/logo/presidencia.png', 'png', 10, 10, 28, 28, 'logo', 'FAST');
            pdf.setFontSize(8);
            pdf.text('SISTEMA MUNICIPAL DE AGUA POTABLE, ALCANTARILLADO Y SANEAMIENTO DE DOLORES HIDALGO, GUANAJUATO(SIMAPAS)', pdf.internal.pageSize.width / 2, 20, {align: 'center'});
            const imgProps = pdf.getImageProperties(img);
            const pdfAncho = pdf.internal.pageSize.getWidth();
            const pdfAlto = (imgProps.height * pdfAncho) / imgProps.width;
            pdf.addImage(img, 'PNG', 0, 40, pdfAncho, pdfAlto);
            pdf.save('PBR' + DateTime.now() + '.pdf');
            pbrRef.style.color = '';
            this.ngxUiLoaderService.stopLoader(this.loader);
        });
    }
}
