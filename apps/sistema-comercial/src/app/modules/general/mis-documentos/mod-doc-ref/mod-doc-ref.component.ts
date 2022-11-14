import {AfterContentChecked, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, Observable, startWith, tap} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {DocsRefGQL} from '#/libs/datos/src';
import {STATE_DATOS_SESION} from '@s-app/auth/auth.state';
import {IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';

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
    @ViewChild('entradaRef') refInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    refCtrl = new FormControl();
    refFiltrados: Observable<string[]>;
    referencias: string[] = [];
    todasRef: string[] = [];

    constructor(private docsRef: DocsRefGQL, private dRef: MatDialogRef<ModDocRefComponent>)
    {

    }

    ngOnInit(): void
    {
        this.docsRef.watch({usuario: STATE_DATOS_SESION()._id}).valueChanges.pipe(tap((res) =>
        {
            if (res.data)
            {
                const respuesta = res.data.docsRef as IResolveDocumento[];
                respuesta.map(r => this.todasRef.push(r.seguimiento));
            }
        })).subscribe();
    }

    ngAfterContentChecked(): void
    {
        this.refFiltrados = this.refCtrl.valueChanges.pipe(
            startWith(null),
            map((referencia: string | null) => referencia ? this._filter(referencia) : this.todasRef.slice()));
    }

    add(event: MatChipInputEvent): void
    {
        if (!this.matAutocomplete.isOpen)
        {
            const input = event;
            const value = event.value;

            // Add our fruit
            if ((value || '').trim())
            {
                this.referencias.push(value.trim());
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
        const index = this.referencias.indexOf(fruit);
        if (index >= 0)
        {
            this.referencias.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void
    {
        this.referencias.push(event.option.viewValue);
        this.refInput.nativeElement.value = '';
        this.refCtrl.setValue(null);
    }

    asignar(): void
    {
        console.log(this.referencias);
    }

    cerrar(): void
    {
        this.dRef.close();
    }

    private _filter(value: string): string[]
    {
        const filterValue = value.toLowerCase();
        return this.todasRef.filter(filtroRef => filtroRef.toLowerCase().indexOf(filterValue) === 0);
    }
}
