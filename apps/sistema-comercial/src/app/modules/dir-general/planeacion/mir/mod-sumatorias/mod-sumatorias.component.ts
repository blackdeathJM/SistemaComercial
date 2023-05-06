import {AfterContentInit, ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
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
import {PlaneacionService, ValoresCamposMod} from "@s-dir-general/store/planeacion.service";
import {IPlaneacion} from "#/libs/models/src/lib/dir-general/planeacion/planeacion.interface";
import {IEditarSumatoriaPBR} from "@s-dir-general/store/planeacion.interfaces";
import {ISumatorias} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";

@Component({
    selector: 'app-mod-sumatorias',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatOptionModule, MatSelectModule, RegistrosComponent, MatInputModule, RxReactiveFormsModule, ReactiveFormsModule],
    templateUrl: './mod-sumatorias.component.html',
    styleUrls: ['./mod-sumatorias.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModSumatoriasComponent implements OnInit, AfterContentInit
{
    planeacion: IPlaneacion = null;
    sumatoria: ISumatorias = null;
    formSum: FormGroup;

    constructor(public seleccionQuery: SeleccionQuery, public planeacionQuery: PlaneacionQuery, public mdr: MatDialogRef<ModSumatoriasComponent>, private fb: RxFormBuilder,
                private planeacionService: PlaneacionService, @Inject(MAT_DIALOG_DATA) private data: IEditarSumatoriaPBR)
    {
    }

    ngOnInit(): void
    {
        this.formSum = this.fb.formGroup(new RegSumPbr());
    }

    ngAfterContentInit(): void
    {
        if (this.data.actualizar)
        {
            this.planeacion = this.planeacionQuery.getActive();
            this.sumatoria = this.planeacion.pbrSumatoria.find(value => value.idSumatoria === this.data.idSumatoria);
            this.formSum.patchValue(this.sumatoria);
        }
    }

    filCentroGestor(e: string): void
    {
        this.planeacion = this.planeacionQuery.filPlaneacionDinamica(ValoresCamposMod.pbrCuestionario, ValoresCamposMod.centroGestor, e);
        console.log(this.planeacion);
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

        this.planeacionService.sumatoriaPbr(datos, false).subscribe();
    }
}
