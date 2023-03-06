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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {SeleccionStore} from '@s-dir-general/selecciones/seleccion.store';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ListaMirComponent} from '@s-dir-general/mir/lista-mir/lista-mir.component';
import {ListaTabMirComponent} from '@s-dir-general/mir/lista-tab-mir/lista-tab-mir.component';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {EntityMir} from '@s-dir-general/mir/store/mir.entity';
import {MirService} from '@s-dir-general/mir/store/mir.service';
import {TMirsPorAno, TMirsPorCentroGestor} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir-consultas.dto';
import {AccionesMirPbrComponent} from '@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component';
import {CentrosGestoresGQL} from "#/libs/datos/src";

@Component({
    selector: 'app-mir',
    standalone: true,
    imports: [CommonModule, ModMirComponent, MatTableModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatCardModule, FormsModule, MatToolbarModule,
        MatButtonToggleModule, MatSidenavModule, ListaMirComponent, ListaTabMirComponent, RxReactiveFormsModule, ReactiveFormsModule, AccionesMirPbrComponent],
    providers: [MirService],
    templateUrl: './mir.component.html',
    styleUrls: ['./mir.component.scss']
})
export default class MirComponent
{
    buscarAno: number = new Date().getFullYear();
    abrirPanel = false;

    constructor(public mdr: MatDialog, private ngxToast: NgxToastService, private entityMir: EntityMir, private mirService: MirService)
    {
    }


    regSeleccion(): void
    {
        this.mdr.open(ModMultiplesSeleccionesComponent, {width: '40%'});
    }

    filtrarCentroGestor(e: [string, number]): void
    {
        const consulta: TMirsPorCentroGestor =
            {
                centroGestor: e[0],
                ano: e[1]
            };
        this.mirService.mirsPorCentroGestor(consulta).subscribe();
    }

    buscarPorAno(ano: number): void
    {

        const actMir: TMirsPorAno =
            {
                ano
            };
        this.mirService.mirsPorAno(actMir).subscribe();
    }

    cerrarPanel(): void
    {
        this.abrirPanel = false;
    }
}
