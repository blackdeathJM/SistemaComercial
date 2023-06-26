import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {SeleccionQuery} from '@s-dir-general/selecciones/store/seleccion.query';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TSumPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbrSumatoria.dto';
import {RegSumPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/Pbr';
import {PlaneacionService} from "@s-dir-general/store/planeacion.service";
import {IEditarSumatoriaPBR} from "@s-dir-general/store/planeacion.interface";
import {ISumatorias} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {finalize} from "rxjs";

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
    cargando = false;
    cuestionarioPbr = this.planeacionQuery.compCuestionarioPbr;
    formSum: FormGroup = this.fb.formGroup(new RegSumPbr());

    constructor(public seleccionQuery: SeleccionQuery, public planeacionQuery: PlaneacionQuery, public mdr: MatDialogRef<ModSumatoriasComponent>, private fb: RxFormBuilder,
                private planeacionService: PlaneacionService, @Inject(MAT_DIALOG_DATA) private data: IEditarSumatoriaPBR)
    {
    }

    ngOnInit(): void
    {
        if (this.data.actualizar)
        {
            const planeacion = this.planeacionQuery.getActive();
            const sumatoria: ISumatorias = planeacion.pbrSumatoria.find(value => value.idSumatoria === this.data.idSumatoria);
            this.formSum.patchValue(sumatoria);
        }
    }

    resSumatoria(): void
    {
        this.cargando = true;
        const datos: TSumPbr =
            {
                ...this.formSum.value,
                _id: this.planeacionQuery.getActive()._id,
                idSumatoria: this.data.idSumatoria,
                sumTotal: false
            };
        this.formSum.disable();
        this.planeacionService.sumatoriaPbr(datos, this.data.actualizar).pipe(finalize(() =>
        {
            this.cargando = false;
            this.formSum.enable();
            this.mdr.close();
        })).subscribe();
    }

    trackByFn(index: number, elemento: string): number | string
    {
        return index || elemento;
    }

    filCentroGestor(e: string): void
    {
        this.planeacionQuery.centroGestor.set(e);
    }
}
