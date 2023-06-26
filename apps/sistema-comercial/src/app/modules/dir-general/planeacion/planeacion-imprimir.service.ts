import {Injectable} from '@angular/core';
import {jsPDF} from 'jspdf'
import autoTable, {applyPlugin, CellHook, Styles} from "jspdf-autotable";

applyPlugin(jsPDF);

@Injectable({
    providedIn: 'root'
})
export class PlaneacionImprimirService
{
    static imprimirTabla(columnas: object[], styles: Partial<Styles>, columnStyles: { [p: string]: Partial<Styles> }, cuerpo: Array<any>, subtitulo: string, didParseCell?: CellHook): void
    {
        const titulo = 'SISTEMA MUNICIPAL DE AGUA POTABLE, ALCATARILLADO Y SANEAMIENTO DE DOLORES HIDALGO, GUANAJUATO(SIMAPAS)';
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'legal'
        });

        doc.addImage('assets/images/logo/presidencia.png', 'png', 10, 10, 28, 28, 'logo', 'FAST');
        doc.setFontSize(10);
        doc.text(titulo, doc.internal.pageSize.width / 2, 20, {align: 'center'});
        doc.setFontSize(8);
        doc.text(subtitulo, doc.internal.pageSize.width / 2, 25, {align: 'center'});
        autoTable(doc, {
            pageBreak: 'auto',
            startY: 40,
            tableWidth: 'auto',
            columns: columnas,
            columnStyles,
            didParseCell,
            styles,
            theme: 'striped',
            useCss: true,
            body: cuerpo,
        });
        doc.output('dataurlnewwindow');
    }
}
