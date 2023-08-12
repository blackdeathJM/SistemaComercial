import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuseAlertModule} from "@s-fuse/alert";
import {MatCardModule} from "@angular/material/card";
import {fuseAnimations} from "@s-fuse/public-api";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ISumatorias} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {MatGridListModule} from "@angular/material/grid-list";
import {IEditarSumatoriaPBR} from "@s-dir-general/store/planeacion.interface";
import {MatDialog} from "@angular/material/dialog";
import {ModSumatoriasComponent} from "@s-dir-general/mir/mod-sumatorias/mod-sumatorias.component";
import {MatTabsModule} from "@angular/material/tabs";
import {NgxUiLoaderModule} from "ngx-ui-loader";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import {DateTime} from "luxon";

@Component({
    selector: 'app-lista-sum-pbr',
    standalone: true,
    imports: [CommonModule, FuseAlertModule, MatCardModule, MatButtonModule, MatIconModule, MatGridListModule, MatTabsModule, NgxUiLoaderModule],
    templateUrl: './lista-sum-pbr.component.html',
    styleUrls: ['./lista-sum-pbr.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaSumPbrComponent
{
    @Input({required: true}) set sumatoriasPbr(v: ISumatorias)
    {
        this._sumatoria = v;
    }

    @ViewChild('sumatoriaImprimir') sumatoriaImprimirRef!: ElementRef;
    _sumatoria: ISumatorias = null;

    constructor(private mdr: MatDialog)
    {
    }

    editarSumatoriaPbr(): void
    {
        const data: IEditarSumatoriaPBR =
            {
                idSumatoria: this._sumatoria.idSumatoria,
                actualizar: true
            }
        this.mdr.open(ModSumatoriasComponent, {width: '40%', data, hasBackdrop: true, disableClose: true})
    }

    imprimirSumatoria(): void
    {
        const sum = this.sumatoriaImprimirRef.nativeElement;
        sum.style.color = 'black';
        html2canvas(sum).then(canvas =>
        {
            const imagen = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'pt', 'a4');
            pdf.addImage('assets/images/logo/presidencia.png', 'png', 10, 10, 28, 28, 'logo', 'FAST');
            pdf.setFontSize(8);
            pdf.text('SISTEMA MUNICIPAL DE AGUA POTABLE, ALCANTARILLADO Y SANEAMIENTO DE DOLORES HIDALGO, GUANAJUATO(SIMAPAS)', pdf.internal.pageSize.width / 2, 20, {align: 'center'});
            const imgProps = pdf.getImageProperties(imagen);
            const pdfAncho = pdf.internal.pageSize.getWidth();
            const pdfAlto = (imgProps.height * pdfAncho) / imgProps.width;
            pdf.addImage(imagen, 'PNG', 0, 40, pdfAncho, pdfAlto);
            pdf.line(10, pdfAlto + 50, pdfAncho - 20, pdfAlto + 50);
            pdf.save('sumatoria' + DateTime.now() + DateTime.DATETIME_FULL + '.pdf');
            sum.style.color = '';
        });
    }
}
