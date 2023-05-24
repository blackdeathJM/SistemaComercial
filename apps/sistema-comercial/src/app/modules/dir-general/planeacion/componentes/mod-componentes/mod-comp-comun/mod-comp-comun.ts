import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {RegistrosComponent} from "@s-shared/registros/registros.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {IPbrCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {isNotNil} from "@angular-ru/cdk/utils";
import {IformComun} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RxFormBuilder, RxReactiveFormsModule, RxwebValidators} from "@rxweb/reactive-form-validators";
import {PlaneacionStore} from "@s-dir-general/store/planeacion.store";
import {PlaneacionService} from "@s-dir-general/store/planeacion.service";

@Component({
    selector: 'app-mod-comp-comun',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatSelectModule, RegistrosComponent, MatButtonModule, MatIconModule, ReactiveFormsModule, MatTooltipModule, MatCheckboxModule,
        RxReactiveFormsModule],
    templateUrl: './mod-comp-comun.html',
    styleUrls: ['./mod-comp-comun.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModCompComun implements OnChanges
{
    @Input({required: true}) cuestionarioPbr: IPbrCuestionario = null;
    @Input({required: true}) tipoForm: number;

    datos: IformComun[] = [];
    cuestionarioPbrPeriodoAnt: IPbrCuestionario[] = [];
    periodoAnt: boolean = false;

    validadorNumerico = [RxwebValidators.required, RxwebValidators.numeric({allowDecimal: true, message: 'El valor debe ser numerico'})];
    formComun: FormGroup = this.fb.group({
        idIndicador: ['', RxwebValidators.required],
        dato: ['', RxwebValidators.required],
        trim1: [0, this.validadorNumerico],
        trim2: [0, this.validadorNumerico],
        trim3: [0, this.validadorNumerico],
        trim4: [0, this.validadorNumerico]
    });

    // formTrimAnterior: FormGroup = this.fb.group({
    //     trim1: [0, this.validadorNumerico],
    //     trim2: [0, this.validadorNumerico],
    //     trim3: [0, this.validadorNumerico],
    //     trim4: [0, this.validadorNumerico]
    // });

    constructor(public planeacionQuery: PlaneacionQuery, private fb: RxFormBuilder, private planeacionService: PlaneacionService)
    {

    }

    agregarAlArreglo(): void
    {
        const {idIndicador} = this.formComun.value;
        if (this.periodoAnt)
        {
            const periodoAnt = this.planeacionQuery.filPorAno(this.planeacionQuery.getActive().ano, idIndicador)
            this.formTrimAnterior.patchValue(periodoAnt);
        }

        this.datos.push({
            idIndicador,
            dato: this.formComun.get('dato').value,
            trim1: this.cuestionarioPbr.trim1,
            trim2: this.cuestionarioPbr.trim2,
            trim3: this.cuestionarioPbr.trim3,
            trim4: this.cuestionarioPbr.trim4,
            trim1Anterior: 0,
            trim2Anterior: 0,
            trim3Anterior: 0,
            trim4Anterior: 0
        });

        this.formComun.reset();
    }

    registrar(): void
    {
        console.log(this.datos);
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        if (isNotNil(changes.cuestionarioPbr))
        {
            this.formComun.patchValue(changes.cuestionarioPbr.currentValue);
        }
    }
}
