import {ChangeDetectionStrategy, Component, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccionesMirPbrComponent} from "@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {PlaneacionStore} from "@s-dir-general/store/planeacion.store";
import {fuseAnimations} from "@s-fuse/public-api";
import {MatListModule} from "@angular/material/list";
import {DateTime} from "luxon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {ConfirmacionService} from "@s-services/confirmacion.service";
import {isNil} from "@angular-ru/cdk/utils";
import {PlaneacionService} from "@s-dir-general/store/planeacion.service";
import {TReemplazarComp} from "#/libs/models/src/lib/dir-general/planeacion/planeacion.dto";
import {TablaMatComponent} from "@s-shared/components/tabla-mat/tabla-mat.component";
import {IFormComun, TiposFormulario} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {finalize} from "rxjs";
import {ComponentesPipe} from "@s-dir-general/componentes/componentes.pipe";
import {ITabla} from "#/libs/models/src/lib/tabla.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {ComponentesService} from "@s-dir-general/componentes/componentes.service";

@Component({
    selector: 'app-componentes',
    standalone: true,
    imports: [CommonModule, AccionesMirPbrComponent, MatListModule, MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, TablaMatComponent, ComponentesPipe],
    templateUrl: './componentes.component.html',
    styleUrls: ['./componentes.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentesComponent
{
    columnas: ITabla[] = [];

    datosTable: IFormComun[];
    fecha = DateTime.local().toLocaleString(DateTime.DATE_SHORT);

    constructor(public planeacionQuery: PlaneacionQuery, private planeacionStore: PlaneacionStore, private mdr: MatDialog, private confirmacionService: ConfirmacionService,
                private planeacionService: PlaneacionService, private router: Router, private activatedRoute: ActivatedRoute)
    {
        effect(() =>
        {
            const mir = this.planeacionQuery.cuestionarioMir();
            if (isNil(this.planeacionQuery.getActive()))
            {
                return;
            }
            const pbr = this.planeacionQuery.getActive().pbrCuestionario;
            const sumatoria = this.planeacionQuery.getActive().pbrSumatoria;

            if (isNil(mir) || isNil(mir.componente))
            {
                return;
            }


            switch (mir.componente.tipoForm)
            {
                case TiposFormulario.COMUN:
                    const trimestres = ComponentesService.objFormula(pbr, mir.componente.ids);
                    const tabla = [];

                    mir.componente.formComun.forEach(value =>
                    {

                    });
                    break;
            }
            this.datosTable = this.planeacionQuery.cuestionarioMir().componente.formComun;
        }, {allowSignalWrites: true})
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

    columnasComun(): ITabla[]
    {
        return [
            {
                etiqueta: 'Variable',
                def: 'idIndicador',
                llaveDato: 'idIndicador',
                width: '10%',
            },
            {
                etiqueta: 'Dato',
                def: 'dato',
                llaveDato: 'dato',
                width: 'auto',
            },
            {
                etiqueta: 'Trimestre 1',
                def: 'trim1',
                llaveDato: 'trim1',
                width: '10%',
            },
            {
                etiqueta: 'Trimestre 2',
                def: 'trim2',
                llaveDato: 'trim2',
                width: '10%',
            },
            {
                etiqueta: 'Trimestre 3',
                def: 'trim3',
                llaveDato: 'trim3',
                width: '10%',
            },
            {
                etiqueta: 'Trimestre 4',
                def: 'trim4',
                llaveDato: 'trim4',
                width: '10%',
            }
        ];
    }

    columnasPeriodoAnt(): ITabla[]
    {
        return [
            {
                etiqueta: 'Variable',
                def: 'idIndicador',
                llaveDato: 'idIndicador',
                width: '10%',
            },
            {
                etiqueta: 'Dato',
                def: 'dato',
                llaveDato: 'dato',
                width: 'auto',
            },
            {
                etiqueta: 'Per. Act. 1',
                def: 'trim1',
                llaveDato: 'trim1',
                width: '5%',
            },
            {
                etiqueta: 'Per. Ant. 1',
                def: 'trim1Anterior',
                llaveDato: 'trim1Anterior',
                width: '5%',
            },
            {
                etiqueta: 'Per. Act. 2',
                def: 'trim2',
                llaveDato: 'trim2',
                width: '5%',
            },
            {
                etiqueta: 'Per. Ant. 2',
                def: 'trim2Anterior',
                llaveDato: 'trim2Anterior',
                width: '5%',
            },
            {
                etiqueta: 'Per. Act. 3',
                def: 'trim3',
                llaveDato: 'trim3',
                width: '5%',
            },
            {
                etiqueta: 'Per. Ant. 3',
                def: 'trim3Anterior',
                llaveDato: 'trim3Anterior',
                width: '5%',
            },
            {
                etiqueta: 'Per. Act. 4',
                def: 'trim4',
                llaveDato: 'trim4',
                width: '5%',
            },
            {
                etiqueta: 'Per. Ant. 4',
                def: 'trim4Anterior',
                llaveDato: 'trim4Anterior',
                width: '5%',
            }
        ];
    }

    // calculoPeriodoAnt(trim: string, trimAnt: string): number {
    //     if (this.planeacionQuery.cuestionarioMir().componente.formComun.length === 1) {
    //         const resta = this.planeacionQuery.cuestionarioMir().componente.formComun[0][trim] - this.planeacionQuery.cuestionarioMir().componente.formComun[0][trimAnt];
    //         return resta / this.planeacionQuery.cuestionarioMir().componente.formComun[0][trimAnt];
    //     }
    // }
    //
    // calcularTotal(trim: string): number {
    //     return this.planeacionQuery.cuestionarioMir().componente.formComun.map(trimestre => trimestre[trim]).reduce((acc, act) => acc + act, 0);
    // }
    //
    // calcularComun(trim: string): string {
    //     return (this.planeacionQuery.cuestionarioMir().componente.formComun[0][trim] / this.planeacionQuery.cuestionarioMir().componente.formComun[1][trim]).toFixed(2);
    // }

    imprimirComp(): void
    {
        console.log(this.columnas);
    }
}
