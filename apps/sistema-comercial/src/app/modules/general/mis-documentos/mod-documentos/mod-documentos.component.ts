import {Component, OnInit} from '@angular/core';
import {EmpleadosSesionGQL, SubirArchivoGQL} from '#/libs/datos/src';
import {Subscription, tap} from 'rxjs';
import {IEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {STATE_EMPLEADOS} from '@s-app/empleado/empleado.state';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-mod-documentos',
    templateUrl: './mod-documentos.component.html',
    styleUrls: ['./mod-documentos.component.scss']
})
export class ModDocumentosComponent implements OnInit
{
    fechaMin: Date;
    fechaMax: Date;
    subscripcion: Subscription = new Subscription();
    empleadosSesion: IEmpleado[];
    file = new FormData();
    formDocs: FormGroup = this.fb.group({
        file: [null]
    });

    constructor(private empleadosSesionGQL: EmpleadosSesionGQL, private subirArchivoGQL: SubirArchivoGQL, private fb: RxFormBuilder)
    {
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
        const formData = new FormData();
        formData.append('operations', 'operations');
        console.log('formData', this.formDocs.get('file').value);
        this.subirArchivoGQL.mutate({archivo: this.formDocs.get('file').value}).subscribe((res) =>
        {
            console.log('respuesta', res);
        });
    }
}
