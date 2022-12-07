import {Component, OnInit} from '@angular/core';
import {EmpleadosSesionGQL, GenFolioSinRegGQL, RegDocGQL} from '#/libs/datos/src';
import {finalize, Subscription, tap} from 'rxjs';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {ReactiveFormConfig, RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Documento} from '#/libs/models/src/lib/general/documentos/documento';
import {getDownloadURL, ref, Storage, uploadBytes} from '@angular/fire/storage';
import {IResolveDocumento, TDocumentoReg, TIPOS_DOCUMENTO} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
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
import {SeleccionarEmpleadoComponent} from '@s-shared/components/seleccionar-empleado/seleccionar-empleado.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {confirmarFolio} from '@s-general/detalle-documentos/dialogConfirmacion';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {STATE_EMPLEADOS} from '@s-admin/empleado.state';
import {GeneralService} from '#/apps/sistema-comercial/src/app/services/general.service';
import {STATE_DATOS_SESION} from '@s-core/auth/auth.state';
import {STATE_DOCS} from '@s-general/general.state';
import {MatCardModule} from "@angular/material/card";


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
            MatTooltipModule,
            MatCardModule
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
                fechaRecepcion: GeneralService.convertirUnix(fechaRecepcion.c, fechaRecepcion.ts),
                fechaLimiteEntrega: GeneralService.convertirUnix(fechaLimiteEntrega.c, fechaLimiteEntrega.ts),
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

    cerrar(): void
    {
        if (!this.cargando)
        {
            this.mdr.closeAll();
        }
    }
}
