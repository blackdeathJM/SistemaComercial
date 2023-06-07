import {ChangeDetectionStrategy, Component, effect, Input} from "@angular/core";
import {CommonModule, Location} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {isNil, isNotNil} from "@angular-ru/cdk/utils";
import {AsigFormsComponente, IFormComun, TiposFormulario, TipoValores} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RxFormBuilder, RxReactiveFormsModule, RxwebValidators} from "@rxweb/reactive-form-validators";
import {PlaneacionService} from "@s-dir-general/store/planeacion.service";
import {NgxToastService} from "@s-services/ngx-toast.service";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {fuseAnimations} from "@s-fuse/public-api";
import {DisableControlModule} from "@angular-ru/cdk/directives";
import {MatRadioChange, MatRadioModule} from "@angular/material/radio";
import {FuseAlertModule} from "@s-fuse/alert";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {SeleccionQuery} from "@s-dir-general/selecciones/store/seleccion.query";
import {ComponentesService} from "@s-dir-general/componentes/componentes.service";
import {TRegComponente} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.dto";
import {finalize} from "rxjs";

@Component({
    selector: 'app-mod-comp-comun',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatTooltipModule, MatCheckboxModule,
        RxReactiveFormsModule, MatCardModule, MatToolbarModule, DisableControlModule, MatRadioModule, FuseAlertModule, MatButtonToggleModule],
    templateUrl: './mod-comp-comun.html',
    styleUrls: ['./mod-comp-comun.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fuseAnimations]
})
export class ModCompComun
{
    @Input({required: true}) idIndicadorMir: string = null;
    protected readonly TiposFormulario = TiposFormulario;
    datos: IFormComun[] = [];
    ids: string[] = [];
    tipoForm = TiposFormulario.COMUN;
    cargando = false;
    esSumatoria = false;
    tipoValores = Object.values(TipoValores);

    deshabilitarRadioBtn = true;

    validadorNumerico = [RxwebValidators.required({message: 'Este campo es requerido'}), RxwebValidators.numeric({
        allowDecimal: true,
        message: 'El valor debe ser numerico'
    })];

    formComun: FormGroup = this.fb.group({
        idIndicador: [null, RxwebValidators.required({message: 'El id del indicador es requerido'})],
        dato: [null, RxwebValidators.required({message: 'Es necesario la definicion para este campo'})],

        trim1: [0, this.validadorNumerico],
        trim2: [0, this.validadorNumerico],
        trim3: [0, this.validadorNumerico],
        trim4: [0, this.validadorNumerico]
    });

    formAd: FormGroup = this.fb.group({
        idIndicador: ['', RxwebValidators.required({message: 'Es necesario seleccionar el id'})],
        dato: ['', this.validadorNumerico],

        trim1: [0, this.validadorNumerico],
        trim2: [0, this.validadorNumerico],
        trim3: [0, this.validadorNumerico],
        trim4: [0, this.validadorNumerico]
    });

    formTrimAnterior: FormGroup = this.fb.group({
        trim1: [0, this.validadorNumerico],
        trim2: [0, this.validadorNumerico],
        trim3: [0, this.validadorNumerico],
        trim4: [0, this.validadorNumerico]
    });

    formTipoValores: FormGroup = this.fb.group({
        tipoValorTrim: [null, RxwebValidators.required({message: 'Es necesario seleccionar que tipo de valor son los trimestres'})],
        tipoValorAvance: [null, RxwebValidators.required({message: 'Es necesario seleccionar el tipo de valor para los avances trimestrales'})],
        formula: ['', RxwebValidators.required({message: 'Es necesario que coloques la formula para calcular los avances trimestrales'})]
    })

    constructor(public planeacionQuery: PlaneacionQuery, private fb: RxFormBuilder, private planeacionService: PlaneacionService, private ngxToast: NgxToastService, public seleccionQuery: SeleccionQuery,
                private localizado: Location)
    {
        effect(() =>
        {
            this.esSumatoria = false;
            const cuestionarioPbr = this.planeacionQuery.cuestionarioPbr();
            //================================================================================================================================================================
            if (isNil(cuestionarioPbr))
            {
                return;
            }

            switch (this.planeacionQuery.asigForm())
            {
                case AsigFormsComponente.principal:
                    this.formComun.patchValue(cuestionarioPbr);
                    this.formConValoresDelPeriodoAnt();

                    if (this.datos.length === 0)
                    {
                        this.deshabilitarRadioBtn = false;
                    }
                    break;
                case AsigFormsComponente.adicional:
                    this.formAd.patchValue(this.planeacionQuery.cuestionarioPbr());
                    break;
                case AsigFormsComponente.formula:
                    this.ids.push(cuestionarioPbr.idIndicador);
                    this.formTipoValores.get('formula').setValue(ComponentesService.formula(this.ids, this.tipoForm));
                    break;
            }
        });

        effect(() =>
        {
            const sumatoria = this.planeacionQuery.sumatoriaPbr();
            //=================================================================================================================================================================
            if (isNil(sumatoria))
            {
                return;
            }

            switch (this.planeacionQuery.asigForm())
            {
                case AsigFormsComponente.principal:
                    this.formComun.get('idIndicador').setValue(sumatoria.idSumatoria);
                    this.formComun.get('dato').setValue(sumatoria.nombreSumatoria);
                    this.formComun.patchValue(sumatoria);
                    this.formConValoresDelPeriodoAnt();
                    break;
                case AsigFormsComponente.adicional:
                    this.formAd.get('idIndicador').setValue(sumatoria.idSumatoria);
                    this.formAd.get('dato').setValue(sumatoria.nombreSumatoria);
                    this.formAd.patchValue(sumatoria);
                    break;
                case AsigFormsComponente.formula:
                    this.ids.push(sumatoria.idSumatoria);
                    this.formTipoValores.get('formula').setValue(ComponentesService.formula(this.ids, this.tipoForm));
                    break;
            }
        });
    }

    agregarAlArreglo(): void
    {
        const {idIndicador, dato} = this.formComun.value;

        const {trim1, trim2, trim3, trim4} = this.formTrimAnterior.value;

        const idIndicadorAd: string = this.formAd.get('idIndicador').value;
        const datoAd: string = this.formAd.get('dato').value;

        this.datos.push({
            idIndicador,
            idIndicadorAd,
            dato,
            datoAd,

            trim1Ant: +trim1,
            trim2Ant: +trim2,
            trim3Ant: +trim3,
            trim4Ant: +trim4
        });

        this.ids.push(idIndicador)
        if (idIndicadorAd)
        {
            this.ids.push(idIndicadorAd);
        }
        this.formTipoValores.get('formula').setValue(ComponentesService.formula(this.ids, this.tipoForm));

        this.deshabilitarRadioBtn = true;
        this.ngxToast.infoToast('Se ha agregado un elemento a la lista para su registro', 'Componente');

        this.formComun.reset();
        this.formTrimAnterior.reset();
        this.formAd.reset();
    }

    registrar(): void
    {
        if (this.datos.length === 0)
        {
            this.ngxToast.errorToast('No se puede continuar con el proceso de registro porque la lista esta vacia', 'Componente');
            return;
        }
        this.cargando = true;

        console.log(this.planeacionQuery.cuestionarioMir());
        const regComponente: TRegComponente =
            {
                _id: this.planeacionQuery.getActive()._id,
                idIndicadorMir: this.idIndicadorMir,
                ids: this.ids,
                tipoForm: this.tipoForm,
                tipoValorTrim: this.formTipoValores.get('tipoValorTrim').value,
                tipoValorAvance: this.formTipoValores.get('tipoValorAvance').value,
                formula: this.formTipoValores.get('formula').value,
                formComun: this.datos
            };

        this.formComun.disable();
        this.formTrimAnterior.disable();

        this.planeacionService.regComponente(regComponente).pipe(finalize(() =>
        {
            this.cargando = false;
            this.formComun.enable();
            this.formTrimAnterior.enable();
            this.localizado.back();

        })).subscribe();
    }

    cambioSeleccionRdb(e: MatRadioChange): void
    {
        this.tipoForm = e.value as TiposFormulario;
        this.planeacionQuery.desactivarBtnFormAd(this.tipoForm !== TiposFormulario.CON_OTRO_ID_PBR);
        this.formConValoresDelPeriodoAnt();
    }

    formConValoresDelPeriodoAnt(): void
    {
        if (this.tipoForm === TiposFormulario.PERIODO_ANT)
        {
            this.formAd.reset();
            const id = this.formComun.get('idIndicador').value;
            const periodoAnterior = this.planeacionQuery.filPorAno(this.planeacionQuery.getActive().ano, id, this.esSumatoria);

            if (isNotNil(periodoAnterior))
            {
                this.formTrimAnterior.patchValue(periodoAnterior);
            }
        }
    }

    cancelar(): void
    {
        this.localizado.back();
    }
}
