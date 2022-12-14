import {AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, Observable, startWith, tap} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {DocRefFolioGQL, DocsRefGQL} from '#/libs/datos/src';
import {IResolveDocumento, TDocRefFolio} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {STATE_DATOS_SESION} from '@s-core/auth/auth.state';


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

    constructor(private docsRef: DocsRefGQL, private dRef: MatDialogRef<ModDocRefComponent>, @Inject(MAT_DIALOG_DATA) private data: IResolveDocumento,
                private docRefFolioGQL: DocRefFolioGQL, private ngxToastService: NgxToastService)
    {

    }

    ngOnInit(): void
    {
        this.docsRef.watch({_id: this.data._id, usuario: STATE_DATOS_SESION()._id}).valueChanges.pipe(tap((res) =>
        {
            if (res.data)
            {
                const respuesta = res.data.docsRef as IResolveDocumento[];
                respuesta.map(r => this.todasRef.push(r.seguimiento));
            }
        })).subscribe();
    }

    ngAfterContentInit(): void
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
        if (this.referencias.length === 0)
        {
            this.ngxToastService.alertaToast('Debes tener seleccionado por lo menos un seguimiento', 'Referenciar documentos');
            return;
        }
        const entradas: TDocRefFolio =
            {
                _id: this.data._id,
                ref: this.referencias,
                folio: this.data.folio,
                usuarioFolio: STATE_DATOS_SESION()._id
            };
        this.cargando = true;
        this.docRefFolioGQL.mutate({entradas}).pipe(tap((res) =>
        {
            if (res.data)
            {
                this.cargando = false;
                this.dRef.close(res.data.docRefFolio);
                this.ngxToastService.satisfactorioToast('La referencia se creo correctamente', 'Referenciar folio');
            }
        })).subscribe();
    }

    _filter(value: string): string[]
    {
        const filterValue = value.toLowerCase();
        return this.todasRef.filter(filtroRef => filtroRef.toLowerCase().indexOf(filterValue) === 0);
    }

    cerrar(): void
    {
        this.dRef.close();
    }
}
