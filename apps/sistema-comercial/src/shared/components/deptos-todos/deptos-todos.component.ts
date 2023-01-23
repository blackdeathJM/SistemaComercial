import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {IDepto} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.interface';
import {AbstractControl, ControlValueAccessor, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator} from '@angular/forms';
import {Observable} from 'rxjs';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {Empleado} from '#/libs/models/src/lib/admin/empleado/empleado';
import {DeptoEliminarStore} from '#/apps/sistema-comercial/src/query/deptoEliminar.store';
import {Select} from '@ngxs/store';

@Component({
    selector: 'app-deptos-todos',
    standalone: true,
    imports:
        [
            CommonModule,
            MatFormFieldModule,
            ReactiveFormsModule,
            RxReactiveFormsModule,
            MatSelectModule
        ],
    providers:
        [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => DeptosTodosComponent),
                multi: true
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => DeptosTodosComponent),
                multi: true
            }
        ],
    templateUrl: './deptos-todos.component.html',
    styleUrls: ['./deptos-todos.component.scss']
})
export class DeptosTodosComponent implements OnInit, ControlValueAccessor, Validator
{
    @Select(DeptoEliminarStore.deptos)
    deptos$: Observable<IDepto[]>;
    @Select(DeptoEliminarStore.estaCargando)
    estaCargando$: Observable<boolean>;
    @Input() multiple = false;
    depto: IDepto;
    deshabilitar = false;
    formDepto: FormGroup;
    private onTouched: () => void;

    constructor(public stateDeptos: DeptoEliminarStore, private fb: RxFormBuilder)
    {
    }

    ngOnInit(): void
    {
        const empleado = new Empleado();
        this.formDepto = this.fb.group({deptoId: empleado.deptoId});
        this.stateDeptos.cargarDeptos();
    }

    onChange: (value: boolean) => void = () =>
    {
    };

    writeValue(obj: { deptoId: string }): void
    {
        if (obj)
        {
            this.formDepto.setValue(obj);
        }
    }

    registerOnChange(fn: any): void
    {
        this.onChange(fn);
    }

    registerOnTouched(fn: any): void
    {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void
    {
        this.deshabilitar = isDisabled;
    }

    validate(control: AbstractControl<any, any>): ValidationErrors
    {
        throw new Error('Method not implemented.');
    }

    registerOnValidatorChange?(fn: () => void): void
    {
        throw new Error('Method not implemented.');
    }
}
