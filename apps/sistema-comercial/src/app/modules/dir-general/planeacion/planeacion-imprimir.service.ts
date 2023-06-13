import {Injectable} from '@angular/core';
import {jsPDF} from 'jspdf'
import autoTable, {applyPlugin, Styles} from "jspdf-autotable";

applyPlugin(jsPDF);

@Injectable({
    providedIn: 'root'
})
export class PlaneacionImprimirService
{
    constructor()
    {
    }

    static imprimirTabla(columnas: object[], styles: Partial<Styles>, columnStyles: { [p: string]: Partial<Styles> }, cuerpo: Array<any>, subtitulo: string): void
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
            willDrawCell: data =>
            {
                if (data.section === 'head')
                {
                    console.log(data.cell.getTextPos());
                }
            },
            styles,
            theme: 'striped',
            useCss: true,
            body: cuerpo,
        });
        // doc.save('FichaTecnicaMIR.pdf');
        doc.output('dataurlnewwindow');
    }

    static imprimirHtlm(subtitulo: string): void
    {
        // const titulo = 'SISTEMA MUNICIPAL DE AGUA POTABLE, ALCATARILLADO Y SANEAMIENTO DE DOLORES HIDALGO, GUANAJUATO(SIMAPAS)';
        //
        // const doc = new jsPDF({
        //     orientation: 'landscape',
        //     unit: 'mm',
        //     format: 'legal'
        // });
        //
        // doc.addImage('assets/images/logo/presidencia.png', 'png', 10, 10, 28, 28, 'logo', 'FAST');
        // doc.setFontSize(10);
        // doc.text(titulo, doc.internal.pageSize.width / 2, 20, {align: 'center'});
        // doc.setFontSize(8);
        // doc.text(subtitulo, doc.internal.pageSize.width / 2, 25, {align: 'center'});

    }
}
