import {ChangeDetectionStrategy, Component, effect} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {isNotNil} from "@angular-ru/cdk/utils";
import {IFormComun, TiposFormulario, TipoValores} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
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
import * as math from 'mathjs';
import {MatButtonToggleChange, MatButtonToggleModule} from "@angular/material/button-toggle";

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
    protected readonly TiposFormulario = TiposFormulario;
    datos: IFormComun[] = [];
    ids: string[] = [];
    tipoForm = TiposFormulario.COMUN;
    cargando = false;
    esSumatoria = false;
    tipoValores = Object.values(TipoValores);
    deshabilitarRadioBtn = true;

    cambiaAAd = false;

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
        dato: ['', this.validadorNumerico]
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

    constructor(public planeacionQuery: PlaneacionQuery, private fb: RxFormBuilder, private planeacionService: PlaneacionService, private ngxToast: NgxToastService)
    {
        effect(() =>
        {
            this.esSumatoria = false;
            switch (this.tipoForm)
            {
                case TiposFormulario.COMUN:
                    if (isNotNil(this.planeacionQuery.cuestionarioPbr()))
                    {
                        this.formComun.patchValue(this.planeacionQuery.cuestionarioPbr());
                        this.formComun.disable();
                        if (this.datos.length === 0)
                        {
                            this.deshabilitarRadioBtn = false;
                        }
                    }
                    break;
                case TiposFormulario.CON_OTRO_ID_PBR:
                    if (this.cambiaAAd)
                    {
                        if (isNotNil(this.planeacionQuery.cuestionarioPbr()))
                        {
                            this.formAd.patchValue(this.planeacionQuery.cuestionarioPbr());
                        } else
                        {

                        }
                    }
                    break;
            }
        });

        effect(() =>
        {
            this.esSumatoria = true;
            switch (this.tipoForm)
            {
                case TiposFormulario.COMUN:
                    if (isNotNil(this.planeacionQuery.sumatoriaPbr()))
                    {
                        this.formComun.get('idIndicador').setValue(this.planeacionQuery.sumatoriaPbr().idSumatoria);
                        this.formComun.get('dato').setValue(this.planeacionQuery.sumatoriaPbr().nombreSumatoria);
                        this.formComun.patchValue(this.planeacionQuery.sumatoriaPbr());
                    }
                    break;
                case TiposFormulario.CON_OTRO_ID_PBR:

                    if (isNotNil(this.planeacionQuery.cuestionarioPbr()))
                    {
                        this.formAd.get('idIndicador').setValue(this.planeacionQuery.sumatoriaPbr().idSumatoria);
                        this.formAd.get('dato').setValue(this.planeacionQuery.sumatoriaPbr().nombreSumatoria);
                    }
                    break;

                case TiposFormulario.PERIODO_ANT:
                    this.formConValoresDelPeriodoAnt();
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

        this.formTipoValores.get('formula').setValue(this.ids);

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
        // const regComponente: TRegComponente =
        //     {
        //         _id: this.planeacionQuery.getActive()._id,
        //         idIndicadorMir: this.planeacionQuery.cuestionarioMir().idIndicador,
        //
        //         tipoForm: this.tipoForm,
        //         valorAdicional: this.valorAdicionalUnico ? +this.formComun.get('valorAdicionalValor').value : 0,
        //         tipoValorTrim: this.formComponente.get('tipoValorTrim').value,
        //         tipoValorAvance: this.formComponente.get('tipoValorAvance').value,
        //         formComun: this.datos
        //     }
        // this.formComun.disable();
        // this.formTrimAnterior.disable();
        //
        // this.planeacionService.regComponente(regComponente).pipe(finalize(() =>
        // {
        //     this.cargando = false;
        //     this.formComun.enable();
        //     this.formTrimAnterior.enable();
        //     this.mdr.close();
        // })).subscribe();
    }

    cancelar(): void
    {
        const obj =
            {
                variable: 5,
                otraVariable: 10,
                valor3: 15
            };
        const arreglo = ['10', '20'];
        const formula = `(valor1 - valor2) / valor3 *3`;

        const resultado = math.evaluate(formula, arreglo);
    }

    cambioSeleccionRdb(e: MatRadioChange): void
    {
        this.tipoForm = e.value;
        this.cambiaAAd = this.tipoForm === TiposFormulario.CON_OTRO_ID_PBR;
        //Mostramos trimestres del año anterior, obtenido los trimestres o las sumatorias pbrCuestionario o sumatoria
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

    // agregarAFormula(e: MatButtonToggleChange): void
    // {
    //     // const valorAlmacenado = this.formTipoValores.get('formula').value;
    //     // this.formTipoValores.get('formula').setValue(valorAlmacenado + e.value);
    //
    //     this.formTipoValores.get('formula').setValue()
    // }
}
