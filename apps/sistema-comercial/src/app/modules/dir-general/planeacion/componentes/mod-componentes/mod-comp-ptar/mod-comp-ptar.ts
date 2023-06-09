import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatChipEditedEvent, MatChipGridChange, MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {NgForOf} from "@angular/common";
import {column} from "mathjs";
import {MatIconModule} from "@angular/material/icon";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
    selector: 'app-mod-comp-ptar',
    standalone: true,
    templateUrl: './mod-comp-ptar.html',
    styleUrls: ['./mod-comp-ptar.scss'],
    imports: [
        MatInputModule,
        MatCardModule,
        MatChipsModule,
        NgForOf,
        MatIconModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModCompPtar
{
    cabeceraColumna: string[] = ['Id variable', 'Dato'];
    protected readonly column = column;
    readonly separador = [ENTER, COMMA] as const;
    locutor = inject(LiveAnnouncer);

    agregar(e: MatChipInputEvent): void
    {
        const valor = (e.value || '').trim();
        if (valor)
        {
            this.cabeceraColumna.push(valor);
        }
        e.chipInput!.clear();
    }

    editar(cabecera: string, e: MatChipEditedEvent): void
    {
        const valor = e.value.trim();
        if (!valor)
        {
            this.remover(cabecera);
            return;
        }
        const index = this.cabeceraColumna.indexOf(cabecera);
        if (index >= 0)
        {
            this.cabeceraColumna[index] = valor;
        }
    }

    remover(cabecera: string): void
    {
        const index = this.cabeceraColumna.indexOf(cabecera);
        if (index >= 0)
        {
            this.cabeceraColumna.splice(index, 1);
            this.locutor.announce(`Columna removida`).then();
        }
    }

    cambioValor(e: MatChipGridChange): void
    {
        console.log(e);
    }
}
