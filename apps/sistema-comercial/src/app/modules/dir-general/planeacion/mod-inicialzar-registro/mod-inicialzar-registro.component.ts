import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {MatSelectModule} from '@angular/material/select';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {PlaneacionService} from '@s-dir-general/store/planeacion.service';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {TPlaneacionType} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {finalize} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'sistema-comercial-mod-inicialzar-registro',
    standalone: true,
    imports: [CommonModule, MatInputModule, RegistrosComponent, MatSelectModule, ReactiveFormsModule],
    templateUrl: './mod-inicialzar-registro.component.html',
    styleUrls: ['./mod-inicialzar-registro.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModInicialzarRegistroComponent
{

    ctrlDescripcion = new FormControl('');
    cargando = false;
    seleccionAno: string = null;

    constructor(private planeacionService: PlaneacionService, public planeacionQuery: PlaneacionQuery, public mdr: MatDialogRef<ModInicialzarRegistroComponent>)
    {
    }

    inicializarPlaneacion(): void
    {
        this.cargando = true;
        const datos: TPlaneacionType = {
            _id: this.seleccionAno,
            ano: new Date().getFullYear(),
            descripcion: this.ctrlDescripcion.value,
            copia: true,
            mirCuestionario: [],
            pbrCuestionario: [],
            pbrSumatoria: []
        };

        this.planeacionService.inicializarPlaneacion(datos).pipe(finalize(() =>
        {
            this.cargando = false;
            this.mdr.close();
        })).subscribe();
    }

    seleccionDeAno(e: any): void
    {
        this.seleccionAno = e;
    }
}
