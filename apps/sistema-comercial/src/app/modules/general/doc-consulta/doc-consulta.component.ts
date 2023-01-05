import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs';
import {STATE_DOCS} from '@s-general/general.state';
import {IDocsFechas, IDocsUsuarioProceso, IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {DocsBusquedaGralGQL, DocsFechasGQL, DocsUsuarioProcesoGQL} from '#/libs/datos/src';
import {StateAuth} from '@s-core/auth/auth.store';
import {GeneralService} from '#/apps/sistema-comercial/src/app/services/general.service';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";

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
    cargandoDatos = false;

    constructor(private docsBuscarGralGQL: DocsBusquedaGralGQL, private stateAuth: StateAuth, private docsUsuarioProcesoGQL: DocsUsuarioProcesoGQL,
                private docsFechasGQL: DocsFechasGQL)
    {
    }

    ngOnInit(): void
    {
        this.docUsuarioProceso('pendiente', this.chkBuscar.value);

        this.txtBuscar.valueChanges.pipe(tap(() => this.cargandoDatos = true), debounceTime(1000), distinctUntilChanged(),
            switchMap((consulta: string) =>
                this.docsBuscarGralGQL.watch({
                    usuario: this.stateAuth.snapshot._id, enviadoPor: this.stateAuth.snapshot._id,
                    esEnviadoPor: this.chkBuscar.value, consulta
                }).valueChanges)).subscribe((respuesta) =>
        {
            if (respuesta.data)
            {
                STATE_DOCS(respuesta.data.docsBusquedaGral as IResolveDocumento[]);
                this.cargandoDatos = false;
            }
        });
    }

    docUsuarioProceso(proceso: 'pendiente' | 'terminado', esEnviadoPor: boolean): void
    {
        this.cargandoDatos = true;
        const args: IDocsUsuarioProceso =
            {
                enviadoPor: this.stateAuth.snapshot._id,
                esEnviadoPor,
                proceso: proceso,
                usuario: this.stateAuth.snapshot._id

            };
        this.docsUsuarioProcesoGQL.watch({...args}).valueChanges
            .pipe(tap((res) =>
            {
                this.cargandoDatos = false;
                STATE_DOCS(res.data.docsUsuarioProceso as IResolveDocumento[]);
            })).subscribe();
    }

    pendientes(): void
    {
        this.docUsuarioProceso('pendiente', this.chkBuscar.value);
    }

    terminados(): void
    {
        this.docUsuarioProceso('terminado', this.chkBuscar.value);
    }

    consultaFechasUsuario(): void
    {
        const {fechaInicio, fechaFin} = this.formBuscarFechas.value;
        if (!fechaInicio || !fechaFin)
        {
            return;
        }
        this.cargandoDatos = true;
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
                this.cargandoDatos = false;
                STATE_DOCS(res.data.docsFechas as IResolveDocumento[]);
            }
        })).subscribe();
    }
}
