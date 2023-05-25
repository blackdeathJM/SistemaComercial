import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";
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
import {IformComun, TiposFormulario} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {RxFormBuilder, RxReactiveFormsModule, RxwebValidators} from "@rxweb/reactive-form-validators";
import {PlaneacionService} from "@s-dir-general/store/planeacion.service";
import {finalize, Subscription} from "rxjs";
import {TRegComponente} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.dto";
import {MatDialogRef} from "@angular/material/dialog";
import {NgxToastService} from "@s-services/ngx-toast.service";

@Component({
    selector: 'app-mod-comp-comun',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatSelectModule, RegistrosComponent, MatButtonModule, MatIconModule, ReactiveFormsModule, MatTooltipModule, MatCheckboxModule,
        RxReactiveFormsModule],
    templateUrl: './mod-comp-comun.html',
    styleUrls: ['./mod-comp-comun.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModCompComun implements OnInit, OnChanges, OnDestroy
{
    @Input({required: true}) cuestionarioPbr: IPbrCuestionario = null;
    @Input({required: true}) tipoForm: TiposFormulario;

    datos: IformComun[] = [];
    periodoAnt: boolean = false;

    sub: Subscription = new Subscription();
    cargando = false;
    validadorNumerico = [RxwebValidators.required, RxwebValidators.numeric({allowDecimal: true, message: 'El valor debe ser numerico'})];
    formComun: FormGroup = this.fb.group({
        idIndicador: ['', RxwebValidators.required({message: 'El id del indicador es requerido'})],
        dato: ['', RxwebValidators.required],
        trim1: [0, this.validadorNumerico],
        trim2: [0, this.validadorNumerico],
        trim3: [0, this.validadorNumerico],
        trim4: [0, this.validadorNumerico],
        etiqueta: ['']
    });

    formTrimAnterior: FormGroup = this.fb.group({
        trim1: [0, this.validadorNumerico],
        trim2: [0, this.validadorNumerico],
        trim3: [0, this.validadorNumerico],
        trim4: [0, this.validadorNumerico]
    });

    constructor(public planeacionQuery: PlaneacionQuery, private fb: RxFormBuilder, private planeacionService: PlaneacionService, private mdr: MatDialogRef<ModCompComun>,
                private ngxToast: NgxToastService)
    {

    }

    ngOnInit(): void
    {
        this.sub.add(this.formComun.valueChanges.subscribe(res =>
        {
            if (this.periodoAnt)
            {
                const periodoAnterior = this.obtenerPeriodoAnterior(res.idIndicador);
                if (isNotNil(periodoAnterior))
                {
                    this.formTrimAnterior.patchValue(periodoAnterior);
                }
            }
        }));
    }

    obtenerPeriodoAnterior(idIndicador: string): IPbrCuestionario
    {
        return this.planeacionQuery.filPorAno(this.planeacionQuery.getActive().ano, idIndicador);
    }

    agregarAlArreglo(): void
    {
        const {idIndicador} = this.formComun.value;
        if (this.periodoAnt)
        {
            const periodoAnt = this.planeacionQuery.filPorAno(this.planeacionQuery.getActive().ano, idIndicador)
            this.formTrimAnterior.patchValue(periodoAnt);
        }
        const {trim1, trim2, trim3, trim4} = this.formTrimAnterior.value;
        this.datos.push({
            idIndicador,
            dato: this.formComun.get('dato').value,
            trim1: +this.cuestionarioPbr.trim1,
            trim2: +this.cuestionarioPbr.trim2,
            trim3: +this.cuestionarioPbr.trim3,
            trim4: +this.cuestionarioPbr.trim4,
            trim1Anterior: this.periodoAnt ? +trim1 : 0,
            trim2Anterior: this.periodoAnt ? +trim2 : 0,
            trim3Anterior: this.periodoAnt ? +trim3 : 0,
            trim4Anterior: this.periodoAnt ? +trim4 : 0,
        });
        this.ngxToast.infoToast('Se ha agregado un elemento a la lista para su registro', 'Componente');
        this.formComun.reset();
    }

    registrar(): void
    {
        if (this.datos.length <= 1)
        {
            this.ngxToast.errorToast('No se puede continuar con el proceso de registro porque la lista esta vacia o debe tener por lo menos dos elementos', 'Componente');
            return;
        }

        this.cargando = true;
        const regComponente: TRegComponente =
            {
                _id: this.planeacionQuery.getActive()._id,
                idIndicadorMir: this.planeacionQuery.cuestionarioMir().idIndicador,
                formComun: this.datos,
                tipoForm: TiposFormulario.COMUN,
                periodoAnt: this.periodoAnt,
                etiqueta: this.formComun.get('etiqueta').value,
            }
        this.formComun.disable();
        this.formTrimAnterior.disable();

        this.planeacionService.regComponente(regComponente).pipe(finalize(() =>
        {
            this.cargando = false;
            this.formComun.enable();
            this.formTrimAnterior.enable();
            this.mdr.close();
        })).subscribe();
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        if (isNotNil(changes.cuestionarioPbr))
        {
            this.formComun.patchValue(changes.cuestionarioPbr.currentValue);
        }
    }

    periodoAntCheck(e: MatCheckboxChange): void
    {
        if (this.datos.length === 0)
        {
            this.periodoAnt = e.checked;
        }
        if (this.periodoAnt)
        {
            const periodoAnterior = this.obtenerPeriodoAnterior(this.formComun.get('idIndicador').value);
            if (isNotNil(periodoAnterior))
            {
                this.formTrimAnterior.patchValue(periodoAnterior);
            }
        }
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
