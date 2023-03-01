import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModMirComponent} from '@s-dir-general/mir/mod-mir/mod-mir.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
import {ModMultiplesSeleccionesComponent} from '@s-dir-general/mod-multiples-selecciones/mod-multiples-selecciones.component';
import {FormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {SeleccionStore} from '@s-dir-general/selecciones/seleccion.store';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ListaMirComponent} from '@s-dir-general/mir/lista-mir/lista-mir.component';
import {ListaTabMirComponent} from '@s-dir-general/mir/lista-tab-mir/lista-tab-mir.component';

@Component({
    selector: 'app-mir',
    standalone: true,
    imports: [CommonModule, ModMirComponent, MatTableModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatCardModule, FormsModule, MatToolbarModule,
        MatButtonToggleModule, MatSidenavModule, ListaMirComponent, ListaTabMirComponent],
    templateUrl: './mir.component.html',
    styleUrls: ['./mir.component.scss']
})
export default class MirComponent
{
    buscarAno: number;
    abrirPanel = false;

    constructor(public mdr: MatDialog, public seleccionStore: SeleccionStore, private ngxToast: NgxToastService)
    {
    }


    regSeleccion(): void
    {
        this.mdr.open(ModMultiplesSeleccionesComponent, {width: '40%'});
    }

    buscarPorCentroGestor(e: Event): void
    {

    }

    buscarPorAno(): void
    {
        const ano = parseInt(String(this.buscarAno), 10);
        if (isNaN(ano))
        {
            this.ngxToast.alertaToast('Introduce un año a cuatro digitos', 'Valor numerico requerido');
            return;
        }
    }

    cerrarPanel(): void
    {
        this.abrirPanel = false;
    }
}
