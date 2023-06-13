import {Injectable} from '@angular/core';
import {jsPDF} from 'jspdf'
import autoTable, {applyPlugin} from "jspdf-autotable";

applyPlugin(jsPDF);

@Injectable({
    providedIn: 'root'
})
export class PlaneacionImprimirService
{

    constructor() { }

    static imprimir(encabezado: string[], cuerpo: Array<any>, subtitulo: string): void
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
            head: [encabezado],
            bodyStyles: {overflow: 'linebreak', fontSize: 6, cellWidth: 'wrap'},
            headStyles: {overflow: 'linebreak', fontSize: 6, cellWidth: 'auto'},
            body: cuerpo
        });
        // doc.save('FichaTecnicaMIR.pdf');
        doc.output('dataurlnewwindow');
    }
}
