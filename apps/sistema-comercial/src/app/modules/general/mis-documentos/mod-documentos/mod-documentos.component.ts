import {Component, OnInit} from '@angular/core';
import {EmpleadosSesionGQL, RegDocGQL, SubirArchivoGQL} from '#/libs/datos/src';
import {Subscription, tap} from 'rxjs';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {STATE_EMPLEADOS} from '@s-app/empleado/empleado.state';
import {ReactiveFormConfig, RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormGroup} from '@angular/forms';
import {Documento} from '#/libs/models/src/lib/general/documentos/documento';
import {Storage, ref, uploadBytes, getDownloadURL, deleteObject} from '@angular/fire/storage';
import {IDocumento, IDocumentoReg, TIPOS_DOCUMENTO} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {GeneralService} from '@s-app/services/general.service';
import {STATE_DATOS_SESION} from '@s-app/auth/auth.state';
import {v4 as uuidv4} from 'uuid';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {STATE_DOCS} from '@s-app/general/general.state';
import {NgxToastService} from '#/libs/services/src/lib/services/ngx-toast.service';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FileUploadModule} from "@iplab/ngx-file-upload";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RegistrosComponent} from "@s-shared/registros/registros.component";


@Component({
    standalone: true,
    imports: [
        MatDialogModule,
        RxReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        FileUploadModule,
        MatCheckboxModule,
        RegistrosComponent
    ],
    selector: 'app-mod-documentos',
    templateUrl: './mod-documentos.component.html',
    styleUrls: ['./mod-documentos.component.scss']
})
export class ModDocumentosComponent implements OnInit
{
    fechaMin: Date;
    fechaMax: Date;
    subscripcion: Subscription = new Subscription();
    empleadosSesion: IResolveEmpleado[];
    formDocs: FormGroup;
    cargando = false;
    tiposDoc = TIPOS_DOCUMENTO;

    constructor(private empleadosSesionGQL: EmpleadosSesionGQL, private subirArchivoGQL: SubirArchivoGQL, private fb: RxFormBuilder, private storage: Storage,
                private mdr: MatDialog, private regDocGQL: RegDocGQL, private ngxToastService: NgxToastService)
    {
    }

    ngOnInit(): void
    {
        ReactiveFormConfig.set({validationMessage: {required: 'Este campo es requerido'}});
        const doc = new Documento();
        this.formDocs = this.fb.formGroup(doc);

        const fechaActual = new Date().getFullYear();
        this.fechaMin = new Date(fechaActual - 20, 0, 1);
        this.fechaMax = new Date(fechaActual + 1, 11, 31);

        this.subscripcion.add(this.empleadosSesionGQL.watch({}, {notifyOnNetworkStatusChange: true}).valueChanges.pipe(tap((res) =>
        {
            if (res.data)
            {
                this.empleadosSesion = STATE_EMPLEADOS(res.data.empleadosSesion as IResolveEmpleado[]);
            }
        })).subscribe());
    }

    reg(): void
    {
        // this.fechaHoraActual = moment.unix(fechaRecepcionConv);
        this.cargando = true;
        this.formDocs.disable();
        try
        {
            const ano = new Date().getFullYear();
            const mes = new Date().toLocaleString('es-mx', {month: 'long'});
            const {file, fechaRecepcion, fechaLimiteEntrega, tipoDoc, ...resto} = this.formDocs.value;

            const nombreArchivo = ano + '-' + uuidv4() + '.' + file[0].name.split('.').pop();

            const docRef = ref(this.storage, `SIMAPAS/${tipoDoc}/${ano}/${mes}/${nombreArchivo}`);

            uploadBytes(docRef, file[0]).then(async (res) =>
            {
                const url = await getDownloadURL(res.ref);
                if (url)
                {
                    const regDocumento: IDocumentoReg =
                        {
                            ano,
                            usuarioFolio: null,
                            fechaRecepcion: GeneralService.convertirUnix(fechaRecepcion._i),
                            fechaLimiteEntrega: fechaLimiteEntrega !== null ? GeneralService.convertirUnix(fechaLimiteEntrega._i) : null,
                            enviadoPor: STATE_DATOS_SESION()._id,
                            proceso: 'Pendiente',
                            tipoDoc,
                            docUrl: url,
                            ...resto,
                        };
                    this.subscripcion.add(this.regDocGQL.mutate({datos: regDocumento}).pipe(tap((respDoc) =>
                    {
                        if (respDoc.data)
                        {
                            this.cargando = false;
                            const elementos = STATE_DOCS();
                            STATE_DOCS([...elementos, respDoc.data.regDoc as IDocumento]);
                            this.ngxToastService.satisfactorioToast('El documento se agrego correctamente', 'Alta documentos');
                        } else
                        {
                            const eleminarDocRef = ref(this.storage, url);
                            deleteObject(eleminarDocRef).then(() =>
                            {
                                this.ngxToastService.infoToast('Se elimino el archivo por que no se realizo el registro correctamente', 'Documentos');
                            }).catch(e => this.ngxToastService.errorToast(e, 'Error en la nube'));
                        }
                    })).subscribe());
                }
            }).catch(err => this.ngxToastService.errorToast('Ocurrio un error al cargar el documento', err))
                .finally(() => this.cerrar());

            // this.subirArchivoGQL.mutate({files: {file: this.controlSubir.value, carpeta: 'Perfil'}}).subscribe();
        } catch (e)
        {
            this.ngxToastService.alertaToast('Ocurrio un error', e);
            this.cerrar();
        }
    }

    cerrar(): void
    {
        this.mdr.closeAll();
    }

    // obtenerDocCloudStoreFireBase(): void
    // {
    //
    //     const docsRef = ref(this.storage, 'SIMAPAS');
    //     listAll(docsRef).then(async (res) =>
    //     {
    //         for (const elemento of res.items)
    //         {
    //             console.log('item', elemento);
    //             const url = await getDownloadURL(elemento);
    //             console.log('url', url);
    //         }
    //     }).catch(err => console.log('error obtener', err));
    //     //list(docsRef).then(res => console.log('-----', res)).catch(err => console.log('errro', err));
    // }

    // cambiar(event: Event): void
    // {
    //     this.archivos = event.target['files'];
    // }
}

