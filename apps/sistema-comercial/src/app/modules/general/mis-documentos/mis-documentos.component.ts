import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {IDocsFechas, IDocsUsuarioProceso, IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {MatDialog} from '@angular/material/dialog';
import {DocsBusquedaGralGQL, DocsFechasGQL, DocsUsuarioProcesoGQL} from '#/libs/datos/src';
import {debounceTime, distinctUntilChanged, Subscription, switchMap, tap} from 'rxjs';
import {ListaDetalleComponent} from '@s-shared/plantillas/lista-detalle/lista-detalle.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FuseCardModule} from '@s-fuse/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TailwindLoadingComponent} from '@s-shared/tailwind-loading/tailwind-loading.component';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLuxonDateModule} from '@angular/material-luxon-adapter';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ConvertirTimestamUnixPipe} from '#/apps/sistema-comercial/src/app/pipes/convertir-timestam-unix.pipe';
import {DetalleDocumentosComponent} from '@s-general/detalle-documentos/detalle-documentos.component';
import {STATE_DOCS} from '@s-general/general.state';
import {STATE_DATOS_SESION} from '@s-core/auth/auth.state';
import {ModDocumentosComponent} from '@s-general/mod-documentos/mod-documentos.component';
import {GeneralService} from '#/apps/sistema-comercial/src/app/services/general.service';

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
            MatLuxonDateModule,
            MatCheckboxModule
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
    chkBuscar = new FormControl(false);

    constructor(private dRef: MatDialog, private docsUsuarioProcesoGQL: DocsUsuarioProcesoGQL, private docsFechasGQL: DocsFechasGQL,
                private docsBuscarGralGQL: DocsBusquedaGralGQL)
    {
    }

    ngAfterContentChecked(): void
    {
        this.docs = STATE_DOCS();
    }

    ngOnInit(): void
    {
        this.docUsuarioProceso('pendiente', this.chkBuscar.value);
        this.txtBuscar.valueChanges.pipe(tap(() => this.cargandoDatos = true), debounceTime(1000), distinctUntilChanged(),
            switchMap((consulta: string) =>
                this.docsBuscarGralGQL.watch({
                    usuario: STATE_DATOS_SESION()._id, enviadoPor: STATE_DATOS_SESION()._id,
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
                enviadoPor: STATE_DATOS_SESION()._id,
                esEnviadoPor,
                proceso: proceso,
                usuario: STATE_DATOS_SESION()._id

            };
        this.docsUsuarioProcesoGQL.watch({...args}).valueChanges
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
                enviadoPor: STATE_DATOS_SESION()._id,
                esEnviadoPor: this.chkBuscar.value,
                fechaInicial: GeneralService.convertirUnix(fechaInicio.c, fechaInicio.ts),
                fechaFinal: GeneralService.convertirUnix(fechaFin.c, fechaFin.ts),
                usuario: STATE_DATOS_SESION()._id
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

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
