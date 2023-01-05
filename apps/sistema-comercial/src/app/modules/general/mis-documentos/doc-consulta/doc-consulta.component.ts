import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, of, switchMap, tap} from 'rxjs';
import {IDocsFechas, IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {DocsBusquedaGralGQL, DocsFechasGQL, DocsUsuarioProcesoGQL} from '#/libs/datos/src';
import {StateAuth} from '@s-core/auth/auth.store';
import {GeneralService} from '#/apps/sistema-comercial/src/app/services/general.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {EntityMisDocumentosStore} from '@s-general/entity-mis-documentos.store';
import {$cast} from '@angular-ru/cdk/utils';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';

@Component({
    selector: 'app-doc-consulta',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatCheckboxModule],
    templateUrl: './doc-consulta.component.html',
    styleUrls: ['./doc-consulta.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocConsultaComponent implements OnInit
{
    formBuscarFechas = new FormGroup({fechaInicio: new FormControl(), fechaFin: new FormControl()});
    txtBuscar = new FormControl();
    chkBuscar = new FormControl(false);

    constructor(private docsBuscarGralGQL: DocsBusquedaGralGQL, private stateAuth: StateAuth, private docsUsuarioProcesoGQL: DocsUsuarioProcesoGQL,
                private docsFechasGQL: DocsFechasGQL, private entityMisDocumentos: EntityMisDocumentosStore, private ngxToast: NgxToastService)
    {
    }

    ngOnInit(): void
    {
        this.txtBuscar.valueChanges.pipe(debounceTime(1000), distinctUntilChanged(), catchError(() =>
            {
                this.ngxToast.errorToast('Ocurrio un error al tratar de realizar la consulta', 'Consulta de documentos');
                return of([]);
            }),
            switchMap((consulta: string) =>
                this.docsBuscarGralGQL.watch({
                    usuario: this.stateAuth.snapshot._id, enviadoPor: this.stateAuth.snapshot._id,
                    esEnviadoPor: this.chkBuscar.value, consulta
                }).valueChanges)).subscribe((respuesta) =>
        {
            if (respuesta.data)
            {
                const busqueda = $cast<IResolveDocumento[]>(respuesta.data.docsBusquedaGral);
                this.entityMisDocumentos.setAll(busqueda);
            }
        });
    }

    pendientes(): void
    {
        this.entityMisDocumentos.cargarDocsPorProceso('pendiente', this.chkBuscar.value);
    }

    terminados(): void
    {
        this.entityMisDocumentos.cargarDocsPorProceso('terminado', this.chkBuscar.value);
    }

    consultaFechasUsuario(): void
    {
        const {fechaInicio, fechaFin} = this.formBuscarFechas.value;
        if (!fechaInicio || !fechaFin)
        {
            return;
        }
        const consulta: IDocsFechas =
            {
                enviadoPor: this.stateAuth.snapshot._id,
                esEnviadoPor: this.chkBuscar.value,
                fechaInicial: GeneralService.convertirUnix(fechaInicio.c, fechaInicio.ts),
                fechaFinal: GeneralService.convertirUnix(fechaFin.c, fechaFin.ts),
                usuario: this.stateAuth.snapshot._id
            };

        this.docsFechasGQL.watch({...consulta}, {notifyOnNetworkStatusChange: true}).valueChanges.pipe(tap((res) =>
        {
            if (res.data)
            {
                const consultaFechas = $cast<IResolveDocumento[]>(res.data.docsFechas);
                this.entityMisDocumentos.setAll(consultaFechas);
            }
        })).subscribe();
    }
}
