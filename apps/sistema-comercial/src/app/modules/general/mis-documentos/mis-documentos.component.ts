import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {IDocsFechasUsuarioEnviadoPor, IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {MatDialog} from '@angular/material/dialog';
import {ModDocumentosComponent} from '@s-app/general/mis-documentos/mod-documentos/mod-documentos.component';
import {DocsBusquedaGralGQL, DocsFechasUsuarioEnviadoPorGQL, DocsUsuarioProcesoGQL} from '#/libs/datos/src';
import {STATE_DATOS_SESION} from '@s-app/auth/auth.state';
import {delay, Subscription, tap} from 'rxjs';
import {STATE_DOCS} from '@s-app/general/general.state';
import {ListaDetalleComponent} from '@s-shared/plantillas/lista-detalle/lista-detalle.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FuseCardModule} from '@s-fuse/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TailwindLoadingComponent} from '@s-shared/tailwind-loading/tailwind-loading.component';
import {ConvertirTimestamUnixPipe} from '@s-app/pipes/convertir-timestam-unix.pipe';
import {CommonModule} from '@angular/common';
import {DetalleDocumentosComponent} from '@s-app/general/mis-documentos/detalle-documentos/detalle-documentos.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLuxonDateModule} from '@angular/material-luxon-adapter';

@Component({
    standalone: true,
    imports:
        [
            CommonModule,
            ListaDetalleComponent,
            MatButtonModule,
            MatIconModule,
            FuseCardModule,
            MatTooltipModule,
            TailwindLoadingComponent,
            ConvertirTimestamUnixPipe,
            DetalleDocumentosComponent,
            MatFormFieldModule,
            MatInputModule,
            RxReactiveFormsModule,
            ReactiveFormsModule,
            MatDatepickerModule,
            MatLuxonDateModule
        ],
    selector: 'app-mis-documentos',
    templateUrl: './mis-documentos.component.html',
    styleUrls: ['./mis-documentos.component.scss']
})
export class MisDocumentosComponent implements OnInit, OnDestroy, AfterContentChecked
{
    docs: IResolveDocumento[];
    docSeleccionado: IResolveDocumento;
    abrirP: boolean = false;
    cargandoDatos = false;
    sub: Subscription = new Subscription();
    formBuscarFechas = new FormGroup({fechaInicio: new FormControl(), fechaFin: new FormControl()});
    txtBuscar = new FormControl();
    // formBuscarFechas = this.fb.group({
    //     fechaInicio: [],
    //     fechaFin: []
    // });

    constructor(private dRef: MatDialog, private docsUsuarioProcesoGQL: DocsUsuarioProcesoGQL, private docsFechasUsuarioEnviadoPor: DocsFechasUsuarioEnviadoPorGQL,
                private docsBuscarGralGQL: DocsBusquedaGralGQL)
    {
    }

    ngAfterContentChecked(): void
    {
        this.docs = STATE_DOCS();
    }

    ngOnInit(): void
    {
        this.docUsuarioProceso('pendiente');
        this.sub.add(this.txtBuscar.valueChanges.pipe(delay(300), tap((res) =>
        {
            this.docsBuscarGralGQL.watch({usuario: STATE_DATOS_SESION()._id, consulta: res}).valueChanges.pipe(tap((busqueda) =>
            {
                if (busqueda.data)
                {
                    STATE_DOCS(busqueda.data.docsBusquedaGral as IResolveDocumento[]);
                }
            })).subscribe();
        })).subscribe());
    }

    docUsuarioProceso(proceso: string): void
    {
        this.cargandoDatos = true;
        this.docsUsuarioProcesoGQL.watch({datos: {proceso, usuario: STATE_DATOS_SESION()._id}}).valueChanges
            .pipe(tap((res) =>
            {
                this.cargandoDatos = false;
                STATE_DOCS(res.data.docsUsuarioProceso as IResolveDocumento[]);
            })).subscribe();
    }

    seleccionarDoc(doc: IResolveDocumento): void
    {
        this.docSeleccionado = doc;
        this.abrirP = true;
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    cerrarP(evento: boolean): void
    {
        this.abrirP = evento;
    }

    nuevosDocs(): void
    {
        this.dRef.open(ModDocumentosComponent, {width: '40%', data: null, hasBackdrop: false});
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }

    pendientes(): void
    {
        this.docUsuarioProceso('pendiente');
    }

    terminados(): void
    {
        this.docUsuarioProceso('terminado');
    }

    enviadosPorMi(): void
    {
        const {fechaInicio, fechaFin} = this.formBuscarFechas.value;

        const consulta: IDocsFechasUsuarioEnviadoPor =
            {
                enviadoPor: STATE_DATOS_SESION()._id,
                esEnviadoPor: true,
                fechaInicial: fechaInicio !== null ? fechaInicio['ts'] / 1000 : null,
                fechaFinal: fechaFin !== null ? fechaFin['ts'] / 1000 : null,
                usuario: 'no entra'

            };
        this.fechaUsuarioEnviadoPor(consulta);
    }

    consultaFechasUsuario(): void
    {
        const {fechaInicio, fechaFin} = this.formBuscarFechas.value;
        if (!fechaInicio || !fechaFin)
        {
            return;
        }

        const consulta: IDocsFechasUsuarioEnviadoPor =
            {
                enviadoPor: 'no entra',
                esEnviadoPor: false,
                fechaInicial: fechaInicio['ts'] / 1000,
                fechaFinal: fechaFin['ts'] / 1000,
                usuario: STATE_DATOS_SESION()._id
            };
        this.fechaUsuarioEnviadoPor(consulta);
    }

    fechaUsuarioEnviadoPor(consulta: IDocsFechasUsuarioEnviadoPor): void
    {
        this.cargandoDatos = true;

        this.docsFechasUsuarioEnviadoPor.watch({...consulta}).valueChanges.pipe(tap((res) =>
        {
            if (res.data)
            {
                this.cargandoDatos = false;
                STATE_DOCS(res.data.docsFechasUsuarioEnviadoPor as IResolveDocumento[]);
            }
        })).subscribe();
    }
}
