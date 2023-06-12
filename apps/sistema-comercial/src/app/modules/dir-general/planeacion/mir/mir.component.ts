import {ChangeDetectionStrategy, Component, effect, OnDestroy, signal} from '@angular/core';
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
import {IDatosTablaComun, ITabla} from '#/libs/models/src/lib/tabla.interface';
import {isNil} from '@angular-ru/cdk/utils';
import {TiposFormulario} from '#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface';
import {ComponentesService} from '@s-dir-general/componentes/componentes.service';
import {PlaneacionImprimirService} from "@s-dir-general/planeacion-imprimir.service";

export const abrirPanelMir = signal<boolean>(false)
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
    abrirPanel = abrirPanelMir;
    columnas: ITabla[] = [];
    datosTabla: IDatosTablaComun[];
    avancesTrimestrales: string[] = [];

    constructor(public mdr: MatDialog, public planeacionQuery: PlaneacionQuery, private componentesService: ComponentesService)
    {
        effect(() =>
        {
            const mir = this.planeacionQuery.cuestionarioMir();
            if (isNil(this.planeacionQuery.getActive()))
            {
                return;
            }
            const pbrS = this.planeacionQuery.getActive().pbrCuestionario;
            const sumatorias = this.planeacionQuery.getActive().pbrSumatoria;

            if (isNil(mir) || isNil(mir.componente))
            {
                return;
            }

            const trimObjCalcular = ComponentesService.objFormula(pbrS, mir.componente.ids, mir.componente.formComun, sumatorias);
            this.datosTabla = this.componentesService.construirDatosTabla(pbrS, mir.componente.formComun, sumatorias);
            this.avancesTrimestrales[0] = ComponentesService.calcAvances(mir.componente.formula, trimObjCalcular[0]);
            this.avancesTrimestrales[1] = ComponentesService.calcAvances(mir.componente.formula, trimObjCalcular[1]);
            this.avancesTrimestrales[2] = ComponentesService.calcAvances(mir.componente.formula, trimObjCalcular[2]);
            this.avancesTrimestrales[3] = ComponentesService.calcAvances(mir.componente.formula, trimObjCalcular[3]);

            switch (mir.componente.tipoForm)
            {
                case TiposFormulario.COMUN:
                    this.columnas = ComponentesService.colComun(mir.componente.tipoValorTrim);
                    break;

                case TiposFormulario.CON_OTRO_ID_PBR:
                    this.columnas = ComponentesService.colConValorAd(mir.componente.tipoValorTrim);
                    break;
                case TiposFormulario.PERIODO_ANT:
                    this.columnas = ComponentesService.colPeriodoAnt(mir.componente.tipoValorTrim);
                    break;
            }
        }, {allowSignalWrites: true});
    }

    regSeleccion(): void
    {
        this.mdr.open(ModMultiplesSeleccionesComponent, {width: '70%'});
    }

    inicializarPlaneacion(): void
    {
        this.mdr.open(ModInicialzarRegistroComponent, {width: '40%'});
    }


    ngOnDestroy(): void
    {
        abrirPanelMir.set(false);
        this.planeacionQuery.centroGestor.set(null);
        this.planeacionQuery.cuestionarioMir.set(null);
        this.planeacionQuery.cuestionarioMirV.set([]);
    }

    imprimirTablaMir(): void
    {
        // const encabezado = ['Nivel', 'Resumen narrativo', 'Centro gestor', 'Metodo de calculo', 'Medios de verificacion', 'Supuestos', 'U. de medida', 'Frecuencia de medicion',
        //     'L. Base año', 'L. Base valor', 'Meta', 'S. Indicador', 'Sem. Verde', 'Sem. Amarillo', 'Sem. Rojo', 'A. Trim1', 'A. Trim2', 'A. Trim3', 'A. Trim4'];

        const encabezado = ['Nivel', 'Resumen narrativo', 'Centro gestor', 'Metodo de calculo', 'Medios de verificacion', 'Supuestos', 'U. de medida', 'Frec. de medicion',
            'L. Base año', 'L. Base valor', 'Meta', 'S. Indicador', 'Sem. Verde', 'Sem. Amarillo', 'Sem. Rojo', 'Av. Trim1', 'Av. Trim2', 'Av. Trim3', 'Av. Trim4'];

        // const encabezado = ['Nivel', 'Resumen narrativo', 'Centro gestor', 'Metodo de calculo'];
        const ano = this.planeacionQuery.getActive().ano;
        const mirsActivo = this.planeacionQuery.cuestionarioMirV();
        const subtitulo = 'FICHA TECNICA DEL INDICADOR ' + ano;
        const cuerpo = mirsActivo.map(x =>
        {
            return [x.nivel, x.resumenNarrativo, x.centroGestor, x.metodoCalculo, x.mediosVerificacion, x.supuestos, x.unidadDeMedida, x.frecuenciaMedicion, x.lineaBaseAno, x.lineaBaseValor, x.meta, x.sentidoDelIndicador,
                x.semefVerdeV, x.semefAmarilloV, x.semefRojoV, x.avanceTrim1, x.avanceTrim2, x.avanceTrim3, x.avanceTrim4];
        });

        PlaneacionImprimirService.imprimir(encabezado, cuerpo, subtitulo);
    }
}
