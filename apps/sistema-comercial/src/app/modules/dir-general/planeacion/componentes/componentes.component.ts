import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
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
import {IDatosTablaComun, ITabla} from '#/libs/models/src/lib/tabla.interface';
import {DateTime} from 'luxon';
import {MultiplesFormatosPipe} from "@s-shared/pipes/multiples-formatos.pipe";

@Component({
    selector: 'app-componentes',
    standalone: true,
    imports: [CommonModule, AccionesMirPbrComponent, MatListModule, MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, TablaMatComponent, MultiplesFormatosPipe],
    templateUrl: './componentes.component.html',
    styleUrls: ['./componentes.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentesComponent
{
    _columnas: ITabla[] = [];
    _datosTabla: IDatosTablaComun[] = []
    _avancesTrimestrales: string[] = ['', '', '', ''];
    fecha = DateTime.now();

    @Input({required: true}) set columnas(v: ITabla[])
    {
        this._columnas = v;
    }

    @Input({required: true}) set datosTabla(v: IDatosTablaComun[])
    {
        this._datosTabla = v;
    }

    @Input({required: true}) set avancesTrimestrales(v: string[])
    {
        this._avancesTrimestrales = v;
    }

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
        // console.log(this.columnas);
    }
}
