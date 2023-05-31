import {ChangeDetectionStrategy, Component, effect, signal} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {RegistrosComponent} from "@s-shared/registros/registros.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {isNotNil} from "@angular-ru/cdk/utils";
import {
    IformComun,
    TiposFormulario,
    TipoValores
} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {RxFormBuilder, RxReactiveFormsModule, RxwebValidators} from "@rxweb/reactive-form-validators";
import {PlaneacionService} from "@s-dir-general/store/planeacion.service";
import {finalize} from "rxjs";
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
export class ModCompComun
{
    datos: IformComun[] = [];
    periodoAnt = signal<boolean>(false);

    tipoForm = TiposFormulario.COMUN;

    cargando = false;
    valoresPeriodoAnt: boolean = false;
    valorAdicionalUnico: boolean = false;
    tipoValores = Object.values(TipoValores);

    def: string[] = ['datoDef', 'trim1Def', 'trim2Def', 'trim3Def', 'trim4Def'];
    valores = ['idIndicador', 'datoValor', 'trim1Valor', 'trim2Valor', 'trim3Valor', 'trim4Valor'];

    validadorNumerico = [RxwebValidators.required, RxwebValidators.numeric({
        allowDecimal: true,
        message: 'El valor debe ser numerico'
    })];
    formComun: FormGroup = this.fb.group({
        idIndicador: ['', RxwebValidators.required({message: 'El id del indicador es requerido'})],
        datoDef: ['Descripcion', RxwebValidators.required({message: 'Es necesario la definicion para este campo'})],
        datoValor: ['', RxwebValidators.required({message: 'Es necesario establecer un valor para este campo'})],

        trim1Def: ['Trim1', RxwebValidators.required({message: 'Es necesario definir la definicion para el trimestre'})],
        trim1Valor: [0, this.validadorNumerico],
        trim2Def: ['Trim2', RxwebValidators.required({message: 'Es necesario definir la definicion para el trimestre'})],
        trim2Valor: [0, this.validadorNumerico],
        trim3Def: ['Trim3', RxwebValidators.required({message: 'Es necesario definir la definicion para el trimestre'})],
        trim3Valor: [0, this.validadorNumerico],
        trim4Def: ['Trim4', RxwebValidators.required({message: 'Es necesario definir la definicion para el trimestre'})],
        trim4Valor: [0, this.validadorNumerico],

        valorAdicionalDef: [null],
        valorAdicionalValor: [0, RxwebValidators.numeric({allowDecimal: true, message: 'El valor debe ser numerico'})],
    });

    formTrimAnterior: FormGroup = this.fb.group({
        trim1: [0, this.validadorNumerico],
        trim2: [0, this.validadorNumerico],
        trim3: [0, this.validadorNumerico],
        trim4: [0, this.validadorNumerico]
    });

    formComponente: FormGroup = this.fb.group({
        tipoValorTrim: [null, RxwebValidators.required({message: 'Es necesario seleccionar que tipo de valor son los trimestres'})],
        tipoValorAvance: [null, RxwebValidators.required({message: 'Es necesario seleccionar el tipo de valor para los avances trimestrales'})]
    })

    constructor(public planeacionQuery: PlaneacionQuery, private fb: RxFormBuilder, private planeacionService: PlaneacionService, private mdr: MatDialogRef<ModCompComun>,
                private ngxToast: NgxToastService)
    {
        effect(() =>
        {
            //Efecto que trae los valors del cuestionario pbr
            if(isNotNil(this.planeacionQuery.cuestionarioPbr()))
            {
                this.valoresPeriodoAnt = false;

                this.valores.forEach(valor =>
                {
                    this.formComun.get(valor).setValue(this.planeacionQuery.cuestionarioPbr()[valor.replace('Valor', '')]);
                });
            }
        });

        effect(() =>
        {
            if(isNotNil(this.planeacionQuery.sumatoriaPbr()))
            {
                this.valoresPeriodoAnt = true;
                this.valores.forEach(valor =>
                {
                    let nvoValor = valor;
                    if(valor === 'idIndicador')
                    {
                        nvoValor = 'idSumatoria';
                    }
                    if(valor === 'datoValor')
                    {
                        nvoValor = 'nombreSumatoria';
                    }
                    console.log(valor, nvoValor);
                    this.formComun.get(valor).setValue(this.planeacionQuery.sumatoriaPbr()[nvoValor.replace('Valor', '')]);
                });
            }
        });

        effect(() =>
        {
            if(this.periodoAnt())
            {
                const id = this.formComun.get('idIndicador').value;

                const periodoAnterior = this.planeacionQuery.filPorAno(this.planeacionQuery.getActive().ano, id, this.valoresPeriodoAnt);
                if(isNotNil(periodoAnterior))
                {
                    this.formTrimAnterior.patchValue(periodoAnterior);
                }
            }
        });
    }

    agregarAlArreglo(): void
    {
        const {trim1, trim2, trim3, trim4} = this.formTrimAnterior.value;

        this.datos.push({
            idIndicador: {
                def: 'Id indicador',
                valor: this.formComun.get('idIndicador').value
            },
            dato: {
                def: this.formComun.get('datoDef').value,
                valor: this.formComun.get('datoValor').value
            },
            trim1: {
                def: this.formComun.get('trim1Def').value,
                valor: +this.formComun.get('trim1Valor').value
            },
            trim2: {
                def: this.formComun.get('trim2Def').value,
                valor: +this.formComun.get('trim2Valor').value
            },
            trim3: {
                def: this.formComun.get('trim3Def').value,
                valor: +this.formComun.get('trim3Valor').value
            },
            trim4: {
                def: this.formComun.get('trim3Def').value,
                valor: +this.formComun.get('trim4Valor').value
            },

            trim1Anterior: {
                def: 'Trim 1 ant',
                valor: this.periodoAnt ? +trim1 : 0
            },
            trim2Anterior: {
                def: 'Trim 2 ant',
                valor: this.periodoAnt ? +trim2 : 0
            },
            trim3Anterior: {
                def: 'Trim 3 ant',
                valor: this.periodoAnt ? +trim3 : 0,
            },
            trim4Anterior: {
                def: 'Trim 4 ant',
                valor: this.periodoAnt ? +trim4 : 0
            },
            valorAdicional: {
                def: this.valorAdicionalUnico ? null : this.formComun.get('valorAdicionalDef').value,
                valor: this.valorAdicionalUnico ? 0 : +this.formComun.get('valorAdicionalValor').value
            }
        });

        this.ngxToast.infoToast('Se ha agregado un elemento a la lista para su registro', 'Componente');
        this.def.forEach(definicion =>
        {
            this.formComun.get(definicion).disable();
        });

        this.valores.forEach(rest =>
        {
            this.formComun.get(rest).reset();
        });
    }

    registrar(): void
    {
        if(this.datos.length === 0)
        {
            this.ngxToast.errorToast('No se puede continuar con el proceso de registro porque la lista esta vacia', 'Componente');
            return;
        }
        this.cargando = true;

        const regComponente: TRegComponente =
            {
                _id: this.planeacionQuery.getActive()._id,
                idIndicadorMir: this.planeacionQuery.cuestionarioMir().idIndicador,
                tipoForm: this.tipoForm,
                valorAdicionalUnico: this.valorAdicionalUnico,
                valorAdicional: {
                    def: this.valorAdicionalUnico ? this.formComun.get('valorAdicionalDef').value : null,
                    valor: this.valorAdicionalUnico ? +this.formComun.get('valorAdicionalValor').value : 0
                },
                tipoValorTrim: this.formComponente.get('tipoValorTrim').value,
                tipoValorAvance: this.formComponente.get('tipoValorAvance').value,
                formComun: this.datos
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

    periodoAntCheck(e: MatCheckboxChange): void
    {
        if(this.datos.length === 0)
        {
            this.periodoAnt.set(e.checked);
            this.tipoForm = e ? TiposFormulario.PERIODO_ANT : TiposFormulario.COMUN;
        }
    }

    establecerValorUnico(e: MatCheckboxChange): void
    {
        this.valorAdicionalUnico = e.checked;
    }
}
