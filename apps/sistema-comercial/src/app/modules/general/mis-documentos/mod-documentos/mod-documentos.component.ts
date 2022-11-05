import {Component, OnInit} from '@angular/core';
import {EmpleadosSesionGQL, RegDocGQL} from '#/libs/datos/src';
import {finalize, Subscription, tap} from 'rxjs';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {STATE_EMPLEADOS} from '@s-app/empleado/empleado.state';
import {ReactiveFormConfig, RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Documento} from '#/libs/models/src/lib/general/documentos/documento';
import {deleteObject, getDownloadURL, ref, Storage, uploadBytes} from '@angular/fire/storage';
import {IResolveDocumento, TDocumentoReg, TIPOS_DOCUMENTO} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {GeneralService} from '@s-app/services/general.service';
import {STATE_DATOS_SESION} from '@s-app/auth/auth.state';
import {v4 as uuidv4} from 'uuid';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {STATE_DOCS} from '@s-app/general/general.state';
import {NgxToastService} from '#/libs/services/src/lib/services/ngx-toast.service';
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
            MatIconModule
        ],
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

    constructor(private empleadosSesionGQL: EmpleadosSesionGQL, private fb: RxFormBuilder, private storage: Storage,
                private mdr: MatDialog, private regDocGQL: RegDocGQL, private ngxToastService: NgxToastService)
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

    reg(esRemoto: boolean): void
    {
        this.cargando = true;
        this.formDocs.disable();

        // valores que forman la ruta para guardar el documento en cloud de firesotre
        const ano = new Date().getFullYear();
        const mes = new Date().toLocaleString('es-mx', {month: 'long'});

        const {file, fechaRecepcion, fechaLimiteEntrega, tipoDoc, ...resto} = this.formDocs.value;
        const nombreArchivo = ano + '-' + uuidv4() + '.' + file._files[0].name.split('.').pop();

        if (esRemoto)
        {
            const docRef = ref(this.storage, `SIMAPAS/${tipoDoc}/${ano}/${mes}/${nombreArchivo}`);
            uploadBytes(docRef, file._files[0]).then(async (res) =>
            {
                try
                {
                    const url = await getDownloadURL(res.ref);
                    if (url)
                    {
                        const regDocumento: TDocumentoReg = this.valoresRegDoc(ano, tipoDoc, fechaRecepcion, fechaLimiteEntrega, url, resto);
                        this.subscripcion.add(this.regDocGQL.mutate({datos: regDocumento}).pipe(finalize(() => this.cerrar()), tap((respDoc) =>
                        {
                            // Verificamos que la respuesta tenga documentos si la respuesta fuera indefinida o nulla eliminamos el documento de la nube
                            if (respDoc.data)
                            {
                                const elementos = STATE_DOCS();
                                STATE_DOCS([...elementos, respDoc.data.regDoc as IResolveDocumento]);
                                this.cargando = false;
                                this.ngxToastService.satisfactorioToast('El documento se agrego correctamente', 'Alta documentos');
                            } else
                            {
                                // si la data no viene eliminamos el documento de la nube ya que el registro no se realizo correctamente
                                const eleminarDocRef = ref(this.storage, url);
                                deleteObject(eleminarDocRef).then(() =>
                                {
                                    this.ngxToastService.infoToast('Se elimino el archivo por que no se realizo el registro correctamente', 'Documentos');
                                }).catch((e) =>
                                {
                                    this.ngxToastService.errorToast(e, 'Error en la nube');
                                });
                            }
                        })).subscribe());
                    } else
                    {
                        this.ngxToastService.alertaToast('Ocurrio un error al tratar de guardar el documento', 'Subir documento');
                    }
                } catch (e)
                {
                    this.ngxToastService.errorToast(e, 'Error al subir documento');
                    this.cerrar();
                }
            }).catch(err => this.ngxToastService.errorToast('Ocurrio un error al cargar el documento', err))
                .finally(() => this.cerrar());
        } else
        {
            const regDoc = this.valoresRegDoc(ano, tipoDoc, fechaRecepcion, fechaLimiteEntrega, 'local', resto);
            this.subscripcion.add(this.regDocGQL.mutate({datos: regDoc, files: {file: file._files, carpeta: 'documentos'}}).pipe(tap((res) =>
            {
                if (res.data)
                {
                    const elementos = STATE_DOCS();
                    STATE_DOCS([...elementos, res.data.regDoc as IResolveDocumento]);
                    this.ngxToastService.satisfactorioToast('El documento se agrego correctamente en servidor local', 'Alta documentos');
                }
            }), finalize(() =>
            {
                this.cargando = false;
                this.cerrar();
            })).subscribe());
        }
    }

    valoresRegDoc(ano: number, tipoDoc: string, fechaRecepcion: any, fechaLimiteEntrega: any, url: string, resto: any): TDocumentoReg
    {
        return {
            ano,
            tipoDoc,
            fechaRecepcion: GeneralService.convertirUnix(fechaRecepcion._i),
            fechaLimiteEntrega: fechaLimiteEntrega !== null ? GeneralService.convertirUnix(fechaLimiteEntrega._i) : 0,
            enviadoPor: STATE_DATOS_SESION()._id,
            docUrl: url,
            ...resto
        };

    }

    cerrar(): void
    {
        if (!this.cargando)
        {
            this.mdr.closeAll();
        }
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

