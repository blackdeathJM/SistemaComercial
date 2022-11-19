import {Component, OnInit} from '@angular/core';
import {EmpleadosSesionGQL, GenFolioSinRegGQL, RegDocGQL} from '#/libs/datos/src';
import {finalize, Subscription, tap} from 'rxjs';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {STATE_EMPLEADOS} from '@s-app/empleado/empleado.state';
import {ReactiveFormConfig, RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Documento} from '#/libs/models/src/lib/general/documentos/documento';
import {getDownloadURL, ref, Storage, uploadBytes} from '@angular/fire/storage';
import {IResolveDocumento, TDocumentoReg, TIPOS_DOCUMENTO} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {GeneralService} from '@s-app/services/general.service';
import {STATE_DATOS_SESION} from '@s-app/auth/auth.state';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {NgxToastService} from '@s-app/services/ngx-toast.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FileUploadModule} from '@iplab/ngx-file-upload';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {CommonModule} from '@angular/common';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FuseConfirmationConfig, FuseConfirmationService} from '@s-fuse/confirmation';
import {confirmarFolio} from '@s-app/general/mis-documentos/detalle-documentos/dialogConfirmacion';
import {SeleccionarEmpleadoComponent} from '@s-shared/components/seleccionar-empleado/seleccionar-empleado.component';
import {STATE_DOCS} from '@s-app/general/general.state';
import {MatTooltipModule} from "@angular/material/tooltip";


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
            FileUploadModule,
            MatCheckboxModule,
            RegistrosComponent,
            MaterialFileInputModule,
            MatIconModule,
            MatButtonModule,
            SeleccionarEmpleadoComponent,
            MatTooltipModule
        ],
    providers:
        [],
    selector: 'app-mod-documentos',
    templateUrl: './mod-documentos.component.html',
    styleUrls: ['./mod-documentos.component.scss']
})
export class ModDocumentosComponent implements OnInit
{
    anoActual = new Date().getFullYear();
    mesActual = new Date().getMonth();
    diaActual = new Date().getDate();

    minDate = new Date(this.anoActual, this.mesActual, this.diaActual - 20);
    maxDate = new Date(this.anoActual, this.mesActual, this.diaActual);

    subscripcion: Subscription = new Subscription();
    empleadosSesion: IResolveEmpleado[];
    formDocs: FormGroup;
    cargando = false;
    tiposDoc = TIPOS_DOCUMENTO;
    archivos;
    confFolio: FuseConfirmationConfig = confirmarFolio;
    #usuarioFolio = null;

    constructor(private empleadosSesionGQL: EmpleadosSesionGQL, private fb: RxFormBuilder, private storage: Storage, private configService: FuseConfirmationService,
                private mdr: MatDialog, private regDocGQL: RegDocGQL, private ngxToastService: NgxToastService, private genFolioSinRegGQL: GenFolioSinRegGQL)
    {
    }

    ngOnInit(): void
    {
        ReactiveFormConfig.set({validationMessage: {required: 'Este campo es requerido'}});
        this.formDocs = this.fb.formGroup(new Documento());

        this.subscripcion.add(this.empleadosSesionGQL.watch({}, {notifyOnNetworkStatusChange: true}).valueChanges.pipe(tap((res) =>
        {
            if (res.data)
            {
                this.empleadosSesion = STATE_EMPLEADOS(res.data.empleadosSesion as IResolveEmpleado[]);
            }
        })).subscribe());
    }

    async reg(esRemoto: boolean): Promise<void>
    {
        this.cargando = true;
        this.formDocs.disable();
        const ano = new Date().getFullYear();
        const {file, fechaRecepcion, fechaLimiteEntrega, tipoDoc, folio, ...resto} = this.formDocs.value;

        let docUrl: string = null;
        let files = null;

        if (file)
        {
            if (esRemoto)
            {
                try
                {
                    const docRef = ref(this.storage, GeneralService.rutaGuardar(tipoDoc, file._files[0].name, 'documentos'));
                    const resUpload = await uploadBytes(docRef, file._files[0]);
                    docUrl = await getDownloadURL(resUpload.ref);
                } catch (e)
                {
                    this.ngxToastService.errorToast(e, 'Ocurrio un errro al tratar de subir el documento');
                    return;
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
                folio,
                ano,
                tipoDoc,
                docUrl,
                usuarioFolio: this.#usuarioFolio,
                fechaRecepcion: GeneralService.convertirUnix(fechaRecepcion.c),
                fechaLimiteEntrega: GeneralService.convertirUnix(fechaLimiteEntrega.c),
                enviadoPor: STATE_DATOS_SESION()._id,
                ...resto
            };
        this.subscripcion.add(this.regDocGQL.mutate({datos: regDocumento, files}).pipe(finalize(() =>
        {
            this.cargando = false;
            this.cerrar();
        }), tap((res) =>
        {
            if (res.data)
            {
                const elementos = STATE_DOCS();
                STATE_DOCS([...elementos, res.data.regDoc as IResolveDocumento]);
                this.ngxToastService.satisfactorioToast('El documento fue registrado con exito', 'Alta a documentos');
            }
        })).subscribe());
    }

    genFolio(): void
    {
        const {tipoDoc} = this.formDocs.value;
        if (!tipoDoc)
        {
            this.ngxToastService.alertaToast('Selecciona el tipo de documento antes de generar el folio', 'Generar folio');
            return;
        }
        this.configService.open(this.confFolio).afterClosed().subscribe((res) =>
        {
            if (res === 'confirmed')
            {
                this.genFolioSinRegGQL.mutate({args: {tipoDoc, deptoId: STATE_DATOS_SESION().deptoId}}).pipe(tap((folioGenerado) =>
                {
                    if (folioGenerado.data.genFolioSinReg)
                    {
                        this.formDocs.get('folio').setValue(folioGenerado.data.genFolioSinReg);
                        this.#usuarioFolio = STATE_DATOS_SESION()._id;
                    }
                })).subscribe();
            }
        });
    }

    cerrar(): void
    {
        if (!this.cargando)
        {
            this.mdr.closeAll();
        }
    }
}
