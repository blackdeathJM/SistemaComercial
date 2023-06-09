import {AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ModCompComun} from "@s-dir-general/componentes/mod-componentes/mod-comp-comun/mod-comp-comun";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {SeleccionQuery} from "@s-dir-general/selecciones/store/seleccion.query";
import {MatListModule} from "@angular/material/list";
import {IPbrCuestionario, ISumatorias} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {fuseAnimations} from "@s-fuse/public-api";
import {ActivatedRoute} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {isNil} from "@angular-ru/cdk/utils";
import {AsigFormsComponente} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {Subscription} from "rxjs";
import {FuseAlertModule} from "@s-fuse/alert";
import {ModCompPtar} from "@s-dir-general/componentes/mod-componentes/mod-comp-ptar/mod-comp-ptar";

@Component({
    selector: 'app-mod-componentes',
    standalone: true,
    imports: [CommonModule, MatButtonToggleModule, ModCompComun, MatFormFieldModule, MatOptionModule, MatSelectModule, MatListModule, MatTabsModule, MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule, FuseAlertModule, ModCompPtar],
    templateUrl: './mod-componentes.component.html',
    styleUrls: ['./mod-componentes.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModComponentesComponent implements OnInit, AfterContentInit, OnDestroy
{
    indice: number = 0;
    idIndicadorMir = null;
    definicionIndicador = '';
    metodoCalculo = '';
    protected readonly asignacion = AsigFormsComponente;
    sub = new Subscription();

    constructor(public planeacionQuery: PlaneacionQuery, public seleccionQuery: SeleccionQuery, private activatedRoute: ActivatedRoute, private location: Location)
    {
    }

    ngOnInit(): void
    {
        if (isNil(this.planeacionQuery.getActive()))
        {
            this.location.back();
        }
        this.sub.add(this.activatedRoute.params.subscribe(params => this.idIndicadorMir = params.idMir));
    }

    ngAfterContentInit(): void
    {
        //TODO: checar con las actualizaciones de angular si las signals no tienen error y siguen teniendo el valor despues de hacer el navigate para reemplazar este codigo por la signla
        // que tiene asignado el elemento mir este codigo es provicional para que funcione

        if (isNil(this.planeacionQuery.getActive()))
        {
            return;
        }
        const mirBuscado = this.planeacionQuery.getActive().mirCuestionario.find(x => x.idIndicador === this.idIndicadorMir);
        this.definicionIndicador = mirBuscado.nombreDelIndicador;
        this.metodoCalculo = mirBuscado.metodoCalculo;
    }

    filCentroGestor(e: string): void
    {
        this.planeacionQuery.centroGestor.set(e);
    }

    cambioIndice(e: number): void
    {
        this.indice = e;
    }

    seleccionarPbr(pbr: IPbrCuestionario, asig: AsigFormsComponente): void
    {
        this.planeacionQuery.asigForm(asig);
        this.planeacionQuery.cuestionarioPbr.set(pbr);
    }

    seleccionarSumatoria(sumatoria: ISumatorias, asig: AsigFormsComponente): void
    {
        this.planeacionQuery.asigForm(asig);
        this.planeacionQuery.sumatoriaPbr.set(sumatoria)
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
