import {ChangeDetectionStrategy, Component, forwardRef, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {IDepto} from "#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.interface";
import {EntityDeptoStore} from "@s-dirAdmonFinanzas/departamento/store/entity-depto.store";

@Component({
    selector: 'app-drop-down-deptos',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatSelectModule],
    templateUrl: './drop-down-deptos.component.html',
    styleUrls: ['./drop-down-deptos.component.scss'],
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DropDownDeptosComponent), multi: true}],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownDeptosComponent implements ControlValueAccessor, OnInit
{
    onChangeCb?: (depto: IDepto) => void;
    onTouchCb?: () => void;
    deptoSeleccionado: IDepto;
    isDisable = false;
    ctrlDeptos = new FormControl();

    constructor(public entityDepto: EntityDeptoStore)
    {
    }

    ngOnInit(): void
    {

    }

    deptoSelec(depto: IDepto): void
    {
        this.onChangeCb?.(depto);
    }

    registerOnChange(fn: any): void
    {
        this.onChangeCb = fn;
    }

    registerOnTouched(fn: any): void
    {
        this.onTouchCb = fn;
    }

    setDisabledState(isDisabled: boolean): void
    {
        this.isDisable = isDisabled;
    }

    writeValue(depto: IDepto): void
    {
        this.deptoSeleccionado = depto;
    }
}
