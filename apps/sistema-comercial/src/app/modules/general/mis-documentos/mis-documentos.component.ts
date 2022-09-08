import {Component, Input, OnInit} from '@angular/core';
import {IEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';

@Component({
    selector: 'app-mis-documentos',
    templateUrl: './mis-documentos.component.html',
    styleUrls: ['./mis-documentos.component.scss']
})
export class MisDocumentosComponent implements OnInit
{
    _empleado: IEmpleado;
    constructor()
    {
    }
    @Input() set empleado(value: IEmpleado)
    {
        this._empleado = value;
    }

    ngOnInit(): void
    {
    }
}
