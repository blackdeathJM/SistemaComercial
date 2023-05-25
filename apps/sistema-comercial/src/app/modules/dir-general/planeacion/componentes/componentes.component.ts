import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
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
import {isNil, isNotNil} from "@angular-ru/cdk/utils";
import {PlaneacionService} from "@s-dir-general/store/planeacion.service";
import {TReemplazarComp} from "#/libs/models/src/lib/dir-general/planeacion/planeacion.dto";
import {TablaMatComponent} from "@s-shared/components/tabla-mat/tabla-mat.component";
import {IComponente, IformComun, IFormPlanta} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {IMirCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface";
import {ITabla} from "@s-shared/components/tabla-mat/tabla-interface";

@Component({
    selector: 'app-componentes',
    standalone: true,
    imports: [CommonModule, AccionesMirPbrComponent, MatListModule, MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, TablaMatComponent],
    templateUrl: './componentes.component.html',
    styleUrls: ['./componentes.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentesComponent implements OnChanges
{
    @Input({required: true}) datos: IMirCuestionario;
    cuestionarioMir = this.planeacionQuery.cuestionarioMir;

    columnas: ITabla[] = [];
    datosTable: IformComun[] | IFormPlanta[];

    fecha = DateTime.local().toLocaleString(DateTime.DATE_SHORT);

    constructor(private planeacionQuery: PlaneacionQuery, private planeacionStore: PlaneacionStore, private mdr: MatDialog, private confirmacionService: ConfirmacionService,
                private planeacionService: PlaneacionService)
    {
    }

    nuevoElemento(): void
    {
        if (isNotNil(this.cuestionarioMir().componente))
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
                    this.planeacionService.reemplazarComp(args).subscribe();
                }
            });
        }
        this.mdr.open(ModComponentesComponent, {width: '50%', data: null});
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        /* *Recibimos el valor por un input para estar en espera de cualquier cambio y poder mandar los datos personalizados a la mat-table y asi
         *mostrar los datos dependiendo la forma que se haya registrado, se hubiera porder recibir directamente del signal el problema es que no se puede
         * realizar una funcion para hacer las adecuaciones necesarias */

        const componente: IComponente = changes.datos.currentValue.componente;
        if (isNil(componente))
        {
            return;
        }

        this.columnas =
            [
                {
                    etiqueta: 'Id indicador',
                    def: 'idIndicador',
                    llaveDato: 'idIndicador',
                },
                {
                    etiqueta: 'Dato',
                    def: 'dato',
                    llaveDato: 'dato'
                },
                {
                    etiqueta: 'Trimestre 1',
                    def: 'trim1',
                    llaveDato: 'trim1'
                },
                {
                    etiqueta: 'Trimestre 2',
                    def: 'trim2',
                    llaveDato: 'trim2'
                },
                {
                    etiqueta: 'Trimestre 3',
                    def: 'trim3',
                    llaveDato: 'trim3'
                },
                {
                    etiqueta: 'Trimestre 4',
                    def: 'trim4',
                    llaveDato: 'trim4'
                },
            ];
        this.datosTable = componente.formComun;
    }

    imprimirComp(): void
    {

    }
}
