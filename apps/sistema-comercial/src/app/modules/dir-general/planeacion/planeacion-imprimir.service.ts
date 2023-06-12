import {Injectable} from '@angular/core';
import {jsPDF} from 'jspdf'
import autoTable from "jspdf-autotable";
@Injectable({
    providedIn: 'root'
})
export class PlaneacionImprimirService
{

    constructor() { }

    static imprimir(encabezado: string[], cuerpo: Array<any>,subtitulo: string): void
    {
        const titulo = 'SISTEMA MUNICIPAL DE AGUA POTABLE, ALCATARILLADO Y SANEAMIENTO DE DOLORES HIDALGO, GUANAJUATO(SIMAPAS)';

        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'letter'
        });

        doc.text(titulo, doc.internal.pageSize.width / 2, 25, {align: 'center'});

        autoTable(doc, {
            head: [encabezado],
            body: cuerpo,
        });
    }
}
