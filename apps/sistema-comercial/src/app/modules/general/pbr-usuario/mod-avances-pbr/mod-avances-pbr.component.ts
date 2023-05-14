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
    pbrCuestionario = this.planeacionQuery.cuestionarioPbr;
    cargando = false;

    constructor(private fb: RxFormBuilder, private planeacionQuery: PlaneacionQuery, public mdr: MatDialogRef<ModAvancesPbrComponent>, private planeacionService: PlaneacionService)
    {
    }

    ngOnInit(): void
    {
        this.formAvances = this.fb.formGroup(new AvancesPbr());
        this.planeacion = this.planeacionQuery.getEntity(avancesPbr()[0]);

        this.planeacionQuery.cuestionarioPbr.set(this.planeacion.pbrCuestionario.find(value => value.idIndicador === avancesPbr()[1]));
    }

    ngAfterContentInit(): void
    {
        this.formAvances.patchValue(this.pbrCuestionario());
    }

    regAvancePbr(): void
    {
        this.cargando = true;
        const {enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre} = this.formAvances.value;
        const datos: TRegAvancesPbr =
            {
                _id: this.planeacion._id,
                recalcular: false,
                centroGestor: this.pbrCuestionario().centroGestor,
                tipoOperacion: this.pbrCuestionario().tipoOperacion,
                idIndicador: this.pbrCuestionario().idIndicador,
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
        })).subscribe((res) =>
        {
            const pbr = res.data.regAvancePbr.pbrCuestionario.find(value => value.idIndicador === this.pbrCuestionario().idIndicador);
            this.planeacionQuery.cuestionarioPbr.set(<IPbrCuestionario>pbr);
        });
    }
}
