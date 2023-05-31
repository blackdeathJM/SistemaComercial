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
import {ModComponentesComponent} from "@s-dir-general/componentes/mod-componentes/mod-componentes.component";
import {MatCardModule} from "@angular/material/card";
import {ConfirmacionService} from "@s-services/confirmacion.service";
import {isNil} from "@angular-ru/cdk/utils";
import {PlaneacionService} from "@s-dir-general/store/planeacion.service";
import {TReemplazarComp} from "#/libs/models/src/lib/dir-general/planeacion/planeacion.dto";
import {TablaMatComponent} from "@s-shared/components/tabla-mat/tabla-mat.component";
import {IformComun, TiposFormulario} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {ITabla} from "@s-shared/components/tabla-mat/tabla-interface";
import {finalize} from "rxjs";
import {ComponentesPipe} from "@s-dir-general/componentes/componentes.pipe";

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

    datosTable: IformComun[];
    fecha = DateTime.local().toLocaleString(DateTime.DATE_SHORT);

    constructor(public planeacionQuery: PlaneacionQuery, private planeacionStore: PlaneacionStore, private mdr: MatDialog, private confirmacionService: ConfirmacionService,
                private planeacionService: PlaneacionService)
    {
        effect(() =>
        {
            if (isNil(this.planeacionQuery.cuestionarioMir()) || isNil(this.planeacionQuery.cuestionarioMir().componente))
            {
                return;
            }

            switch (this.planeacionQuery.cuestionarioMir().componente.tipoForm)
            {
                case TiposFormulario.COMUN:
                    if (this.planeacionQuery.cuestionarioMir().componente.formComun.length === 1)
                    {
                        this.planeacionQuery.cuestionarioMir.mutate(act =>
                        {
                            // act.avanceTrim1 = Number(act.componente.formComun[0].trim1.toFixed(2));
                            // act.avanceTrim2 = Number(act.componente.formComun[0].trim2.toFixed(2));
                            // act.avanceTrim3 = Number(act.componente.formComun[0].trim3.toFixed(2));
                            // act.avanceTrim4 = Number(act.componente.formComun[0].trim4.toFixed(2));
                        });
                    } else
                    {
                        this.planeacionQuery.cuestionarioMir.mutate(act =>
                        {
                            act.avanceTrim1 = Number(this.calcularComun('trim1'));
                            act.avanceTrim2 = Number(this.calcularComun('trim2'));
                            act.avanceTrim3 = Number(this.calcularComun('trim3'));
                            act.avanceTrim4 = Number(this.calcularComun('trim4'));
                        });
                    }
                    this.columnas = this.columnasComun();
                    break;
                case TiposFormulario.PERIODO_ANT:
                    if (this.planeacionQuery.cuestionarioMir().componente.formComun.length === 1)
                    {
                        this.planeacionQuery.cuestionarioMir.mutate(act =>
                        {
                            act.avanceTrim1 = Number(this.calculoPeriodoAnt('trim1', 'trim1Anterior').toFixed(2));
                            act.avanceTrim2 = Number(this.calculoPeriodoAnt('trim2', 'trim2Anterior').toFixed(2));
                            act.avanceTrim3 = Number(this.calculoPeriodoAnt('trim3', 'trim3Anterior').toFixed(2));
                            act.avanceTrim4 = Number(this.calculoPeriodoAnt('trim4', 'trim4Anterior').toFixed(2));
                        });
                    } else
                    {
                        const sumaTrim1 = this.calcularTotal('trim1');
                        const sumaTrim2 = this.calcularTotal('trim2');
                        const sumaTrim3 = this.calcularTotal('trim3');
                        const sumaTrim4 = this.calcularTotal('trim4');

                        const sumaTrim1Ant = this.calcularTotal('trim1Anterior');
                        const sumaTrim2Ant = this.calcularTotal('trim2Anterior');
                        const sumaTrim3Ant = this.calcularTotal('trim3Anterior');
                        const sumaTrim4Ant = this.calcularTotal('trim4Anterior');

                        this.planeacionQuery.cuestionarioMir.mutate(act =>
                        {
                            act.avanceTrim1 = Number(((sumaTrim1 - sumaTrim1Ant) / sumaTrim1Ant).toFixed(2));
                            act.avanceTrim2 = Number(((sumaTrim2 - sumaTrim2Ant) / sumaTrim2Ant).toFixed(2));
                            act.avanceTrim3 = Number(((sumaTrim3 - sumaTrim3Ant) / sumaTrim3Ant).toFixed(2));
                            act.avanceTrim4 = Number(((sumaTrim4 - sumaTrim4Ant) / sumaTrim4Ant).toFixed(2));
                        });
                    }
                    break;
            }
            this.columnas = this.columnasPeriodoAnt();
            this.datosTable = this.planeacionQuery.cuestionarioMir().componente.formComun;
        }, {allowSignalWrites: true})
    }


    nuevoElemento(): void
    {
        if (isNil(this.planeacionQuery.cuestionarioMir().componente))
        {
            this.mdr.open(ModComponentesComponent, {width: '50%', data: null});
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
                            idIndicador: this.planeacionQuery.cuestionarioMir().idIndicador
                        };
                    this.planeacionService.reemplazarComp(args).pipe(finalize(() => this.mdr.open(ModComponentesComponent, {width: '50%', data: null}))).subscribe();
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

    calculoPeriodoAnt(trim: string, trimAnt: string): number
    {
        if (this.planeacionQuery.cuestionarioMir().componente.formComun.length === 1)
        {
            const resta = this.planeacionQuery.cuestionarioMir().componente.formComun[0][trim] - this.planeacionQuery.cuestionarioMir().componente.formComun[0][trimAnt];
            return resta / this.planeacionQuery.cuestionarioMir().componente.formComun[0][trimAnt];
        }
    }

    calcularTotal(trim: string): number
    {
        return this.planeacionQuery.cuestionarioMir().componente.formComun.map(trimestre => trimestre[trim]).reduce((acc, act) => acc + act, 0);
    }

    calcularComun(trim: string): string
    {
        return (this.planeacionQuery.cuestionarioMir().componente.formComun[0][trim] / this.planeacionQuery.cuestionarioMir().componente.formComun[1][trim]).toFixed(2);
    }

    imprimirComp(): void
    {
        console.log(this.columnas);
    }
}
