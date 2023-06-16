import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
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
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {IDatosTablaFormComun, IGenerarColumnTabla} from "#/libs/models/src/lib/tabla.interface";
import {TiposFormulario} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {TablaComponenteService} from "@s-dir-general/componentes/services/tabla-componente.service";

@Component({
    selector: 'app-componentes',
    standalone: true,
    imports: [CommonModule, AccionesMirPbrComponent, MatListModule, MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, TablaMatComponent, MultiplesFormatosPipe,
        MatCheckboxModule],
    templateUrl: './componentes.component.html',
    styleUrls: ['./componentes.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentesComponent
{
    @ViewChild('componente', {static: false}) componenteRef!: ElementRef;
    mirElemento = this.planeacionQuery.cuestionarioMir();

    @Input({required: true}) set datosTabla(v: IDatosTablaFormComun[])
    {
        this._datosTabla = v;
    }

    columnas: IGenerarColumnTabla[] =
        [
            {
                etiqueta: 'Indicador',
                def: 'idIndicador',
                llaveDato: 'idIndicador',
                width: '7%'
            },
            {
                etiqueta: 'Descripcion',
                def: 'dato',
                llaveDato: 'dato',
                width: 'auto'
            }
        ];

    @Input({required: true}) set avancesTrimestrales(v: string[])
    {
        this._avancesTrimestrales = v;
    }

    tipoForm: string = null;
    _datosTabla: IDatosTablaFormComun[] = [];
    _avancesTrimestrales: string[] = ['', '', '', ''];

    fecha = DateTime.now().toLocaleString();

    constructor(public planeacionQuery: PlaneacionQuery, private confirmacionService: ConfirmacionService, private planeacionService: PlaneacionService,
                private router: Router, private activatedRoute: ActivatedRoute)
    {
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

    imprimirComp(): void
    {
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
            pdf.save('componente.pdf');
            componente.style.color = '';
        });
    }

    cambioChkTrim1(e: MatCheckboxChange, tipoForm: string | null): void
    {
        const tipoDeDato = this.mirElemento.componente.tipoValorTrim;
        switch (tipoForm)
        {
            case TiposFormulario.COMUN:
                if (e.checked)
                {
                    const columna = TablaComponenteService.generarColFormComun(['Trim-1'], ['trim1'], ['6'], [tipoDeDato]);
                    this.columnas.concat(columna);
                } else
                {

                }
                break;
            case TiposFormulario.PERIODO_ANT:
                break;
            case TiposFormulario.CON_OTRO_ID_PBR:
                break;
        }
    }

    cambioChkTrim2(e: MatCheckboxChange, tipoForm: string | null): void
    {
        this.tipoForm = tipoForm;
    }

    cambioChkTrim3(e: MatCheckboxChange, tipoForm: string | null): void
    {
        this.tipoForm = tipoForm;
    }

    cambioChkTrim4(e: MatCheckboxChange, tipoForm: string | null): void
    {
        this.tipoForm = tipoForm;
    }
}
