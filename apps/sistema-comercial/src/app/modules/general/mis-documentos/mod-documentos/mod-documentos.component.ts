import {AfterContentInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RegDocGQL} from '#/libs/datos/src';
import {finalize, tap} from 'rxjs';
import {ReactiveFormConfig, RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Documento} from '#/libs/models/src/lib/general/documentos/documento';
import {getDownloadURL} from '@angular/fire/storage';
import {IResolveDocumento, TDocumentoReg, TIPOS_DOCUMENTO} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {CommonModule, NgIf} from '@angular/common';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FuseConfirmationService} from '@s-fuse/confirmation';
import {SeleccionarEmpleadoComponent} from '@s-shared/components/seleccionar-empleado/seleccionar-empleado.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {GeneralService} from '#/apps/sistema-comercial/src/app/services/general.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {StateAuth} from '@s-core/auth/store/auth.store';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {$cast} from '@angular-ru/cdk/utils';
import {EntityMisDocumentosStore} from '@s-general/store/entity-mis-documentos.store';

@Component({
    standalone: true,
    imports:
        [
            CommonModule,
            MatDialogModule,
            ReactiveFormsModule,
            RxReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
            MatDatepickerModule,
            MatCheckboxModule,
            RegistrosComponent,
            MaterialFileInputModule,
            MatIconModule,
            MatButtonModule,
            SeleccionarEmpleadoComponent,
            MatTooltipModule,
            MatProgressBarModule,
            NgIf
        ],
    selector: 'app-mod-documentos',
    templateUrl: './mod-documentos.component.html',
    styleUrls: ['./mod-documentos.component.scss']
})
export class ModDocumentosComponent implements OnInit, AfterContentInit
{
    anoActual = new Date().getFullYear();
    mesActual = new Date().getMonth();
    diaActual = new Date().getDate();

    minDate = new Date(this.anoActual, this.mesActual, this.diaActual - 20);
    maxDate = new Date(this.anoActual, this.mesActual, this.diaActual);
    formDocs: FormGroup;
    cargando = false;
    porcentaje: number;
    tiposDoc = TIPOS_DOCUMENTO;
    mostrarProgreso: boolean = false;

    constructor(private fb: RxFormBuilder, private configService: FuseConfirmationService, private generalService: GeneralService, private stateAuth: StateAuth,
                private mdr: MatDialog, private regDocGQL: RegDocGQL, private ngxToastService: NgxToastService, private cdr: ChangeDetectorRef,
                public entityEmpleado: EntityEmpleadoStore, private entityMisDocumentos: EntityMisDocumentosStore)
    {
    }

    ngOnInit(): void
    {
        ReactiveFormConfig.set({validationMessage: {required: 'Este campo es requerido'}});
        this.formDocs = this.fb.formGroup(new Documento());
        // Nos subscribimos al api de firebase para obtener el progreso para cuando se suban los archivos
        this.generalService.progreso().subscribe((res) =>
        {
            this.porcentaje = res;
            this.cdr.detectChanges();
        });
    }

    ngAfterContentInit(): void
    {
        this.entityEmpleado.empleadosConSesion();
    }

    async reg(esRemoto: boolean): Promise<void>
    {
        this.cargando = true;
        this.formDocs.disable();
        const {file, fechaRecepcion, fechaLimiteEntrega, tipoDoc, folio, ...resto} = this.formDocs.value;
        // declaro estas variables porque se van a tomar otros valores
        let docUrl: string = null;
        let files = null;

        if (file)
        {
            if (esRemoto)
            {
                try
                {
                    const ruta = GeneralService.rutaGuardar(tipoDoc, file._files[0].name, 'documentos');
                    this.mostrarProgreso = true;
                    const doc = await this.generalService.subirFirebase(file._files[0], ruta);
                    docUrl = await getDownloadURL(doc.ref);
                } catch (e)
                {
                    this.ngxToastService.errorToast(e.message, 'Error en la carga de archivo');
                }
            } else
            {
                files =
                    {
                        file: file._files,
                        url: '',
                        carpeta: 'documentos',
                        eliminar: false
                    };
            }
        }

        const regDocumento: TDocumentoReg =
            {
                ano: new Date().getFullYear(),
                tipoDoc,
                docUrl,
                usuarioFolio: null,
                fechaRecepcion: GeneralService.convertirUnix(fechaRecepcion.c, fechaRecepcion.ts),
                fechaLimiteEntrega: GeneralService.convertirUnix(fechaLimiteEntrega.c, fechaLimiteEntrega.ts),
                enviadoPor: this.stateAuth.snapshot._id,
                ...resto
            };

        this.regDocGQL.mutate({datos: regDocumento, files}).pipe(finalize(() =>
        {
            this.cargando = false;
            this.cerrar();
        }), tap((res) =>
        {
            if (res.data)
            {
                const agregarDoc = $cast<IResolveDocumento>(res.data.regDoc);
                this.entityMisDocumentos.addOne(agregarDoc);
                this.ngxToastService.satisfactorioToast('El documento fue registrado con exito', 'Alta a documentos');
            }
        })).subscribe();
    }

    cerrar(): void
    {
        if (!this.cargando)
        {
            this.mdr.closeAll();
        }
    }
}
