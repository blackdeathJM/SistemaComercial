import {Component, OnInit} from '@angular/core';
import {EmpleadosSesionGQL, SubirArchivoGQL} from '#/libs/datos/src';
import {Subscription, tap} from 'rxjs';
import {IEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {STATE_EMPLEADOS} from '@s-app/empleado/empleado.state';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {FormControl, FormGroup} from '@angular/forms';
import {Documento} from '#/libs/models/src/lib/general/documentos/documento';

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
    controlSubir = new FormControl();

    constructor(private empleadosSesionGQL: EmpleadosSesionGQL, private subirArchivoGQL: SubirArchivoGQL, private fb: RxFormBuilder)
    {
        const doc = new Documento();
        this.formDocs = this.fb.formGroup(doc);

        const fechaActual = new Date().getFullYear();
        this.fechaMin = new Date(fechaActual - 20, 0, 1);
        this.fechaMax = new Date(fechaActual + 1, 11, 31);
    }

    ngOnInit(): void
    {
        this.subscripcion.add(this.empleadosSesionGQL.watch({}, {notifyOnNetworkStatusChange: true}).valueChanges.pipe(tap((res) =>
        {
            if (res.data)
            {
                this.empleadosSesion = STATE_EMPLEADOS(res.data.empleadosSesion as IEmpleado[]);
            }
        })).subscribe());
    }

    reg(): void
    {
        this.subirArchivoGQL.mutate({files: {file: this.controlSubir.value, carpeta: 'Perfil'}}).subscribe();
    }

    // cambiar(event: Event): void
    // {
    //     this.archivos = event.target['files'];
    // }
}

