import {AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {finalize, map, Observable, startWith} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {MisDocumentosService} from '@s-general/store/mis-documentos.service';

@Component({
    selector: 'app-mod-doc-ref',
    standalone: true,
    imports:
        [
            CommonModule, MatDialogModule, MatFormFieldModule, MatChipsModule, MatIconModule, ReactiveFormsModule, MatAutocompleteModule,
            RegistrosComponent
        ],
    templateUrl: './mod-doc-ref.component.html',
    styleUrls: ['./mod-doc-ref.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModDocRefComponent implements OnInit, AfterContentInit
{
    @ViewChild('entradaRef') refInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    visible = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    refCtrl = new FormControl();
    refFiltrados: Observable<string[]>;
    referencias: string[] = [];
    todasRef: string[] = [];
    cargando = false;

    constructor(public dRef: MatDialogRef<ModDocRefComponent>, private ngxToastService: NgxToastService,
                private misDocumentosService: MisDocumentosService)
    {

    }

    ngOnInit(): void
    {
        this.misDocumentosService.docsRef().subscribe((res) =>
        {
            if (isNotNil(res.data))
            {
                const respuesta = $cast<IResolveDocumento[]>(res.data.docsRef);
                respuesta.map(r => this.todasRef.push(r.seguimiento));
            }
        });
    }

    ngAfterContentInit(): void
    {
        this.refFiltrados = this.refCtrl.valueChanges.pipe(startWith(null), map((referencia: string | null) => referencia ? this._filter(referencia) : this.todasRef.slice()));
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
        if (this.referencias.length === 0)
        {
            this.ngxToastService.alertaToast('Debes tener seleccionado por lo menos un seguimiento', 'Referenciar documentos');
            return;
        }

        this.cargando = true;
        this.misDocumentosService.docRefFolio(this.referencias).pipe(finalize(() =>
        {
            this.cargando = false;
            this.dRef.close();
        })).subscribe();
    }

    _filter(value: string): string[]
    {
        const filterValue = value.toLowerCase();
        return this.todasRef.filter(filtroRef => filtroRef.toLowerCase().indexOf(filterValue) === 0);
    }
}
