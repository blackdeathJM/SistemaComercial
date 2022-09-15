import {Component, OnInit} from '@angular/core';
import {EmpleadosSesionGQL, SubirArchivoGQL} from '#/libs/datos/src';
import {Subscription, tap} from 'rxjs';
import {IEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {STATE_EMPLEADOS} from '@s-app/empleado/empleado.state';
import {ReactiveFormConfig, RxFormBuilder} from '@rxweb/reactive-form-validators';
import {FormControl, FormGroup} from '@angular/forms';
import {Documento} from '#/libs/models/src/lib/general/documentos/documento';
import {Storage, ref, uploadBytes, listAll, getDownloadURL} from '@angular/fire/storage';
import moment from "moment";

@Component({
    selector: 'app-mod-documentos',
    templateUrl: './mod-documentos.component.html',
    styleUrls: ['./mod-documentos.component.scss']
})
export class ModDocumentosComponent implements OnInit
{
    archivos: File[];
    fechaMin: Date;
    fechaMax: Date;
    subscripcion: Subscription = new Subscription();
    empleadosSesion: IEmpleado[];
    formDocs: FormGroup;
    fechaHoraActual;

    constructor(private empleadosSesionGQL: EmpleadosSesionGQL, private subirArchivoGQL: SubirArchivoGQL, private fb: RxFormBuilder, private storage: Storage)
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
                this.empleadosSesion = STATE_EMPLEADOS(res.data.empleadosSesion as IEmpleado[]);
            }
        })).subscribe());

        this.obtenerDocCloudStoreFireBase();
    }

    reg(): void
    {
        const {file, fechaRecepcion, fechaLimiteEntrega} = this.formDocs.value;
        const fechaHora =
            {
                ...fechaRecepcion._i,
                hour: new Date().getHours(),
                minutes: new Date().getMinutes()
            };
        const fechaRecepcionConv = moment(fechaHora).unix();
        console.log('datos estraidos', fechaRecepcionConv, new Date().getHours());

        this.fechaHoraActual = moment.unix(fechaRecepcionConv);
        // const docRef = ref(this.storage, `SIMAPAS/${this.controlSubir.value[0]}`);
        // uploadBytes(docRef, this.controlSubir.value[0]).then((res) =>
        // {
        //     const url = getDownloadURL(res.ref);
        // }).catch(err => console.log('error', err))
        //     .finally(() => console.log('final'));

        // this.subirArchivoGQL.mutate({files: {file: this.controlSubir.value, carpeta: 'Perfil'}}).subscribe();
    }

    obtenerDocCloudStoreFireBase(): void
    {

        const docsRef = ref(this.storage, 'SIMAPAS');
        listAll(docsRef).then(async (res) =>
        {
            for (const elemento of res.items)
            {
                console.log('item', elemento);
                const url = await getDownloadURL(elemento);
                console.log('url', url);
            }
        }).catch(err => console.log('error obtener', err));
        // list(docsRef).then(res => console.log('-----', res)).catch(err => console.log('errro', err));
    }

    cambiar(event: Event): void
    {
        this.archivos = event.target['files'];
    }
}

