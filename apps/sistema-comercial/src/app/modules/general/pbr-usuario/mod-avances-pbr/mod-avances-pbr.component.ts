import {AfterContentInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AvancesPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/Pbr';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {avancesPbr, PlaneacionService} from '@s-dir-general/store/planeacion.service';
import {MatDialogRef} from '@angular/material/dialog';
import {TRegAvancesPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';
import {IPbrCuestionario} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface';
import {finalize} from 'rxjs';

@Component({
    selector: 'app-mod-avances-pbr',
    standalone: true,
    imports: [CommonModule, MatInputModule, RegistrosComponent, ReactiveFormsModule, RxReactiveFormsModule],
    templateUrl: './mod-avances-pbr.component.html',
    styleUrls: ['./mod-avances-pbr.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModAvancesPbrComponent implements OnInit, AfterContentInit
{
    formAvances: FormGroup;
    planeacion: IPlaneacion;
    cargando = false;

    constructor(private fb: RxFormBuilder, private planeacionQuery: PlaneacionQuery, public mdr: MatDialogRef<ModAvancesPbrComponent>, private planeacionService: PlaneacionService)
    {
    }

    ngOnInit(): void
    {
        this.formAvances = this.fb.formGroup(new AvancesPbr());
    }

    ngAfterContentInit(): void
    {
        this.planeacion = this.planeacionQuery.getEntity(avancesPbr()[0]);
        this.formAvances.patchValue(this.planeacion.pbrCuestionario[avancesPbr()[1]]);
    }

    regAvancePbr(): void
    {
        this.cargando = true;
        const pbrCuestionario: IPbrCuestionario = this.planeacion.pbrCuestionario[avancesPbr()[1]];
        const {enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre} = this.formAvances.value;
        const datos: TRegAvancesPbr =
            {
                _id: this.planeacion._id,
                esSumatoriaTrim: pbrCuestionario.esSumatoriaTrim,
                esSumatoriaTotal: pbrCuestionario.esSumatoriaTotal,
                idIndicador: pbrCuestionario.idIndicador,
                enero: +enero,
                febrero: +febrero,
                marzo: +marzo,
                abril: +abril,
                mayo: +mayo,
                junio: +junio,
                julio: +julio,
                agosto: +agosto,
                septiembre: +septiembre,
                octubre: +octubre,
                noviembre: +noviembre,
                diciembre: +diciembre
            };
        this.formAvances.disable();
        this.planeacionService.regAvancePbr(datos).pipe(finalize(() =>
        {
            this.cargando = false;
            this.formAvances.enable();
            this.mdr.close();
        })).subscribe();
    }
}
