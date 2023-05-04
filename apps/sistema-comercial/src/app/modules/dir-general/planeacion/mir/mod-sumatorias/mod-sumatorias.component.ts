import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {SeleccionQuery} from '@s-dir-general/selecciones/store/seleccion.query';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {IPbrCuestionario} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TSumPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbrSumatoria.dto';
import {RegSumPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/Pbr';
import {PlaneacionService} from "@s-dir-general/store/planeacion.service";

@Component({
    selector: 'app-mod-sumatorias',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatOptionModule, MatSelectModule, RegistrosComponent, MatInputModule, RxReactiveFormsModule, ReactiveFormsModule],
    templateUrl: './mod-sumatorias.component.html',
    styleUrls: ['./mod-sumatorias.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModSumatoriasComponent implements OnInit
{
    pbrSumatoria: IPbrCuestionario[] = [];
    formSum: FormGroup;

    constructor(public seleccionQuery: SeleccionQuery, public planeacionQuery: PlaneacionQuery, public mdr: MatDialogRef<ModSumatoriasComponent>, private fb: RxFormBuilder,
                private planeacionService: PlaneacionService)
    {
    }

    ngOnInit(): void
    {
        this.formSum = this.fb.formGroup(new RegSumPbr());
    }

    filCentroGestor(e: string): void
    {
        const cuestionario = this.planeacionQuery.getActive().pbrCuestionario.slice();
        this.pbrSumatoria = cuestionario.filter(value => value.centroGestor === e);
    }

    trackByFn(index: number, elemento: string): number | string
    {
        return index || elemento;
    }

    resSumatoria(): void
    {

        const datos: TSumPbr =
            {
                _id: this.planeacionQuery.getActive()._id,
                idSumatoria: '',
                ...this.formSum.value,
            };

        this.planeacionService.sumatoriaPbr(datos).subscribe();
    }
}
