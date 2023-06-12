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
        // autoTable(doc, {
        //     pageBreak: 'auto',
        //     startY: 40,
        //     tableWidth: 'auto',
        //     // didParseCell: (data: CellHookData) =>
        //     // {
        //     //     if (data.column.index === 1)
        //     //     {
        //     //         data.cell.styles.cellWidth = 'wrap';
        //     //     }
        //     // },
        //     head: [encabezado],
        //     body: cuerpo,
        //     bodyStyles: {cellWidth: 'auto'},
        //     headStyles: {cellWidth: 'auto'},
        //     didParseCell: (dataCell: CellHookData) =>
        //     {
        //         dataCell.cell.width = 1000;
        //     },
        //     styles: {
        //         font: 'courier',
        //         fontSize: 6,
        //         cellWidth: 'wrap'
        //     },
        // });
        autoTable(doc, {
            styles: {fillColor: [255, 0, 0]},
            columnStyles: {1: {halign: 'center', fillColor: [0, 255, 0]}}, // Cells in first column centered and green
            margin: {top: 40},
            body: [
                ['Sweden', 'Japan', 'Canada'],
                ['Norway', 'China', 'USA'],
                ['Denmark', 'China', 'Mexico'],
            ],
        });

// Example usage of columns property. Note that America will not be included even though it exist in the body since there is no column specified for it.
        autoTable(doc, {
            columnStyles: {europe: {halign: 'center'}}, // European countries centered
            body: [
                {europe: 'Sweden', america: 'Canada', asia: 'China'},
                {europe: 'Norway', america: 'Mexico', asia: 'Japan'},
            ],
            columns: [
                {header: 'Europe', dataKey: 'europe'},
                {header: 'Asia', dataKey: 'asia'},
                {header: 'Americas', dataKey: 'america'}
            ],
        });
        // doc.save('FichaTecnicaMIR.pdf');
        doc.output('dataurlnewwindow');
    }
}
