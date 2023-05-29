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
    cuestionarioMir = this.planeacionQuery.cuestionarioMir;
    columnas: ITabla[] = [];

    datosTable: IformComun[];
    fecha = DateTime.local().toLocaleString(DateTime.DATE_SHORT);

    sumaTrim1: number = 0;
    sumaTrim2: number = 0;
    sumaTrim3: number = 0;
    sumaTrim4: number = 0;

    sumaTrim1Ant: number = 0;
    sumaTrim2Ant: number = 0;
    sumaTrim3Ant: number = 0;
    sumaTrim4Ant: number = 0;

    avanceTrim1: string = '0';
    avanceTrim2: string = '0';
    avanceTrim3: string = '0';
    avanceTrim4: string = '0';

    constructor(private planeacionQuery: PlaneacionQuery, private planeacionStore: PlaneacionStore, private mdr: MatDialog, private confirmacionService: ConfirmacionService,
                private planeacionService: PlaneacionService)
    {
        effect(() =>
        {
            console.log('Entrando al effect');
            if (isNil(this.cuestionarioMir()) || isNil(this.cuestionarioMir().componente))
            {
                return;
            }
            switch (this.cuestionarioMir().componente.tipoForm)
            {
                case TiposFormulario.UN_VALOR:
                    // this.cuestionarioMir.mutate(act =>
                    // {
                    //     act.avanceTrim1 = act.componente.formComun[0].trim1;
                    //     act.avanceTrim2 = act.componente.formComun[0].trim2;
                    //     act.avanceTrim3 = act.componente.formComun[0].trim3;
                    //     act.avanceTrim4 = act.componente.formComun[0].trim4;
                    // });
                    this.columnas = this.columnasComun();
                    break;
                case TiposFormulario.COMUN:

                    this.avanceTrim1 = (this.cuestionarioMir().componente.formComun[0].trim1 / this.cuestionarioMir().componente.formComun[1].trim1).toFixed(2);
                    this.avanceTrim2 = (this.cuestionarioMir().componente.formComun[0].trim2 / this.cuestionarioMir().componente.formComun[1].trim2).toFixed(2);
                    this.avanceTrim3 = (this.cuestionarioMir().componente.formComun[0].trim3 / this.cuestionarioMir().componente.formComun[1].trim3).toFixed(2);
                    this.avanceTrim4 = (this.cuestionarioMir().componente.formComun[0].trim4 / this.cuestionarioMir().componente.formComun[1].trim4).toFixed(2);

                    this.columnas = this.columnasComun();
                    break;

                case TiposFormulario.PERIODO_ANT:
                    if (this.cuestionarioMir().componente.formComun.length === 1)
                    {
                        this.avanceTrim1 = ((this.cuestionarioMir().componente.formComun[0].trim1 - this.cuestionarioMir().componente.formComun[0].trim1Anterior) / this.cuestionarioMir().componente.formComun[0].trim1Anterior).toFixed(2);
                        this.avanceTrim2 = ((this.cuestionarioMir().componente.formComun[0].trim2 - this.cuestionarioMir().componente.formComun[0].trim2Anterior) / this.cuestionarioMir().componente.formComun[0].trim2Anterior).toFixed(2);
                        this.avanceTrim3 = ((this.cuestionarioMir().componente.formComun[0].trim3 - this.cuestionarioMir().componente.formComun[0].trim3Anterior) / this.cuestionarioMir().componente.formComun[0].trim3Anterior).toFixed(2);
                        this.avanceTrim4 = ((this.cuestionarioMir().componente.formComun[0].trim4 - this.cuestionarioMir().componente.formComun[0].trim4Anterior) / this.cuestionarioMir().componente.formComun[0].trim4Anterior).toFixed(2);
                        return;
                    }
                    this.sumaTrim1 = this.calcularTotal('trim1');
                    this.sumaTrim2 = this.calcularTotal('trim2');
                    this.sumaTrim3 = this.calcularTotal('trim3');
                    this.sumaTrim4 = this.calcularTotal('trim4');

                    this.sumaTrim1Ant = this.calcularTotal('trim1Ant');
                    this.sumaTrim2Ant = this.calcularTotal('trim2Ant');
                    this.sumaTrim3Ant = this.calcularTotal('trim3Ant');
                    this.sumaTrim4Ant = this.calcularTotal('trim4Ant');

                    this.avanceTrim1 = ((this.sumaTrim1 - this.sumaTrim1Ant) / this.sumaTrim1Ant).toFixed(2);

                    this.columnasPeriodoAnt(this.sumaTrim1.toFixed(2), this.sumaTrim1Ant.toFixed(2), this.sumaTrim2.toFixed(2), this.sumaTrim2Ant.toFixed(2),
                        this.sumaTrim3.toFixed(2), this.sumaTrim3Ant.toFixed(2), this.sumaTrim4.toFixed(2), this.sumaTrim4Ant.toFixed(2));
                    break;
            }

            this.datosTable = this.cuestionarioMir().componente.formComun;
        }, {allowSignalWrites: true})
    }


    nuevoElemento(): void
    {
        if (isNil(this.cuestionarioMir().componente))
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
                total: ''
            },
            {
                etiqueta: 'Dato',
                def: 'dato',
                llaveDato: 'dato',
                width: 'auto',
                total: ''
            },
            {
                etiqueta: 'Trimestre 1',
                def: 'trim1',
                llaveDato: 'trim1',
                width: '10%',
                total: ''
            },
            {
                etiqueta: 'Trimestre 2',
                def: 'trim2',
                llaveDato: 'trim2',
                width: '10%',
                total: ''
            },
            {
                etiqueta: 'Trimestre 3',
                def: 'trim3',
                llaveDato: 'trim3',
                width: '10%',
                total: ''
            },
            {
                etiqueta: 'Trimestre 4',
                def: 'trim4',
                llaveDato: 'trim4',
                width: '10%',
                total: ''
            }
        ];
    }

    columnasPeriodoAnt(trim1: string, trim1Ant: string, trim2: string, trim2Ant: string, trim3: string, trim3Ant: string, trim4: string, trim4Ant: string): ITabla[]
    {
        return [
            {
                etiqueta: 'Variable',
                def: 'idIndicador',
                llaveDato: 'idIndicador',
                width: '10%',
                total: 'Total'
            },
            {
                etiqueta: 'Dato',
                def: 'dato',
                llaveDato: 'dato',
                width: 'auto',
                total: ''
            },
            {
                etiqueta: 'Per. Act. 1',
                def: 'trim1',
                llaveDato: 'trim1',
                width: '5%',
                total: trim1
            },
            {
                etiqueta: 'Per. Ant. 1',
                def: 'trim1Anterior',
                llaveDato: 'trim1Anterior',
                width: '5%',
                total: trim1Ant
            },
            {
                etiqueta: 'Per. Act. 2',
                def: 'trim2',
                llaveDato: 'trim2',
                width: '5%',
                total: trim2
            },
            {
                etiqueta: 'Per. Ant. 2',
                def: 'trim2Anterior',
                llaveDato: 'trim2Anterior',
                width: '5%',
                total: trim2Ant
            },
            {
                etiqueta: 'Per. Act. 3',
                def: 'trim3',
                llaveDato: 'trim3',
                width: '5%',
                total: trim3
            },
            {
                etiqueta: 'Per. Ant. 3',
                def: 'trim3Anterior',
                llaveDato: 'trim3Anterior',
                width: '5%',
                total: trim3Ant
            },
            {
                etiqueta: 'Per. Act. 4',
                def: 'trim4',
                llaveDato: 'trim4',
                width: '5%',
                total: trim4
            },
            {
                etiqueta: 'Per. Ant. 4',
                def: 'trim4Anterior',
                llaveDato: 'trim4Anterior',
                width: '5%',
                total: trim4Ant
            }
        ];
    }

    calcularTotal(trim: string): number
    {
        return this.cuestionarioMir().componente.formComun.map(trimestre => trimestre[trim]).reduce((acc, act) => acc + act, 0);
    }

    imprimirComp(): void
    {
        // this.planeacionQuery.cuestionarioMir.mutate(value =>
        // {
        //     value.avanceTrim1 = 10;
        // });
        // this.cuestionarioMir.mutate(sumAvance =>
        // {
        //     // const {avanceTrim1, ...resto} = sumAvance;
        //     // const objModificado = {...resto, avanceTrim1: 10};
        //     // console.log(objModificado);
        //     // return objModificado;
        //     sumAvance.avanceTrim1 = 50;
        //     console.log(sumAvance);
        //     // sumAvance.componente.avanceTrim2 = (sumAvance.componente.formComun[0].trim2 / sumAvance.componente.formComun[1].trim2);
        //     // sumAvance.componente.avanceTrim3 = (sumAvance.componente.formComun[0].trim3 / sumAvance.componente.formComun[1].trim3);
        //     // sumAvance.componente.avanceTrim4 = (sumAvance.componente.formComun[0].trim4 / sumAvance.componente.formComun[1].trim4);
        // });

        this.planeacionQuery.cuestionarioMir.mutate(value => value.avanceTrim1 = 10);
    }
}
