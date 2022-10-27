import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {STATE_DEPTOS} from '@s-app/deptos/deptos.state';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DepartamentosGQL} from '#/libs/datos/src';
import {tap} from 'rxjs';

@Component({
    selector: 'app-deptos-todos',
    standalone: true,
    imports:
        [
            CommonModule,
            MatFormFieldModule,
            MatSelectModule
        ],
    providers:
        [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: DeptosTodosComponent,
                multi: true
            }
        ],
    templateUrl: './deptos-todos.component.html',
    styleUrls: ['./deptos-todos.component.scss']
})
export class DeptosTodosComponent implements ControlValueAccessor
{
    @Input() multiple = false;
    stateDeptos: IDepto[];
    depto: IDepto;
    private onTouched: () => void;

    constructor(private departamentosGQL: DepartamentosGQL)
    {
    }

    onChange: (value: boolean) => void = () =>
    {
    };

    writeValue(value: IDepto): void
    {
        this.depto = value;
    }

    registerOnChange(fn: any): void
    {
        console.log(typeof fn);
        this.onChange(fn);
    }

    registerOnTouched(fn: any): void
    {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void
    {
        throw new Error('Method not implemented.');
    }

    cargarDeptos(): void
    {
        this.departamentosGQL.watch().valueChanges.pipe(tap((res) =>
        {
            console.log('cargando deptos', typeof res.data.deptos);
            this.stateDeptos = STATE_DEPTOS(res.data.deptos as IDepto[]);
        })).subscribe();
    }
}
