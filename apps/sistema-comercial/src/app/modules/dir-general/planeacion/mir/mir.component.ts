import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModMirComponent} from '@s-dir-general/mir/mod-mir/mod-mir.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ModMultiplesSeleccionesComponent} from '@s-dir-general/mod-multiples-selecciones/mod-multiples-selecciones.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ListaTabMirComponent} from '@s-dir-general/mir/lista-tab-mir/lista-tab-mir.component';
import {AccionesMirPbrComponent} from '@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component';
import {ModInicialzarRegistroComponent} from '@s-dir-general/mod-inicialzar-registro/mod-inicialzar-registro.component';
import {idPlaneacion, PlaneacionService} from '@s-dir-general/store/planeacion.service';
import {TFilCentroGestor} from "#/libs/models/src/lib/dir-general/planeacion/planeacion.dto";
import {IPlaneacion} from "#/libs/models/src/lib/dir-general/planeacion/planeacion.interface";

@Component({
    selector: 'app-mir',
    standalone: true,
    imports: [CommonModule, MatSidenavModule, AccionesMirPbrComponent, ModMirComponent, MatButtonToggleModule, MatIconModule, ListaTabMirComponent],
    providers: [],
    templateUrl: './mir.component.html',
    styleUrls: ['./mir.component.scss']
})
export default class MirComponent
{
    abrirPanel = false;

    constructor(public mdr: MatDialog, private ngxToast: NgxToastService, private planeacionService: PlaneacionService)
    {
    }

    regSeleccion(): void
    {
        this.mdr.open(ModMultiplesSeleccionesComponent, {width: '60%'});
    }

    inicializarPlaneacion(): void
    {
        this.mdr.open(ModInicialzarRegistroComponent, {width: '40%'});
    }

    filCentroGestorMir(e: string): void
    {
        if (!idPlaneacion())
        {
            this.ngxToast.alertaToast('Es necesario que selecciones el año', 'Selecciona un año');
            return;
        }
        const args: TFilCentroGestor =
            {
                _id: idPlaneacion(),
                centroGestor: e,
                cuestionario: 'mirCuestionario'
            };

        this.planeacionService.filCentroGestor(args).subscribe();
    }

    filAno(e: IPlaneacion): void
    {
        this.planeacionService.filPorAno(e._id);
    }
}
