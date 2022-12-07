import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {AbstractControl, ControlValueAccessor, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator} from '@angular/forms';
import {DepartamentosGQL} from '#/libs/datos/src';
import {tap} from 'rxjs';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {Empleado} from '#/libs/models/src/lib/admin/empleado/empleado';
import {STATE_DEPTOS} from '@s-admin/deptos.state';

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
    @Input() multiple = false;
    stateDeptos: IDepto[];
    depto: IDepto;
    deshabilitar = false;
    formDepto: FormGroup;
    private onTouched: () => void;

    constructor(private departamentosGQL: DepartamentosGQL, private fb: RxFormBuilder)
    {
    }

    ngOnInit(): void
    {
        const empleado = new Empleado();
        this.formDepto = this.fb.group({deptoId: empleado.deptoId});

        this.departamentosGQL.watch().valueChanges.pipe(tap((res) =>
        {
            this.stateDeptos = STATE_DEPTOS(res.data.deptos as IDepto[]);
        })).subscribe();
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
