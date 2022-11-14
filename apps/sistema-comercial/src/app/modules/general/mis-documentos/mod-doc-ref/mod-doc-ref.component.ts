import {AfterContentChecked, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, Observable, startWith} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {RegistrosComponent} from '@s-shared/registros/registros.component';

@Component({
    selector: 'app-mod-doc-ref',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatChipsModule, MatIconModule, ReactiveFormsModule, MatAutocompleteModule, RegistrosComponent],
    templateUrl: './mod-doc-ref.component.html',
    styleUrls: ['./mod-doc-ref.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModDocRefComponent implements OnInit, AfterContentChecked
{
    @ViewChild('entradaRef') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    refCtrl = new FormControl();
    refFiltrados: Observable<string[]>;
    ref: string[] = [];
    todasRef: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

    constructor()
    {

    }

    ngOnInit(): void
    {

    }

    ngAfterContentChecked(): void
    {
        this.refFiltrados = this.refCtrl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) => fruit ? this._filter(fruit) : this.todasRef.slice()));
    }

    add(event: MatChipInputEvent): void
    {
        if (!this.matAutocomplete.isOpen)
        {
            const input = event.input;
            const value = event.value;

            // Add our fruit
            if ((value || '').trim())
            {
                this.ref.push(value.trim());
            }

            // Reset the input value
            if (input)
            {
                input.value = '';
            }

            this.refCtrl.setValue(null);
        }
    }

    remove(fruit: string): void
    {
        const index = this.ref.indexOf(fruit);
        if (index >= 0)
        {
            this.ref.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void
    {
        this.ref.push(event.option.viewValue);
        this.fruitInput.nativeElement.value = '';
        this.refCtrl.setValue(null);
    }

    asignar(): void
    {
        console.log(this.ref);
    }

    cerrar(): void
    {
    }

    private _filter(value: string): string[]
    {
        const filterValue = value.toLowerCase();

        return this.todasRef.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }
}
