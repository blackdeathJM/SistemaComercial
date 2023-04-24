import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModMirComponent } from '@s-dir-general/mir/mod-mir/mod-mir.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ModMultiplesSeleccionesComponent } from '@s-dir-general/mod-multiples-selecciones/mod-multiples-selecciones.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgxToastService } from '@s-services/ngx-toast.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ListaTabMirComponent } from '@s-dir-general/mir/lista-tab-mir/lista-tab-mir.component';
import { AccionesMirPbrComponent } from '@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component';
import { ModInicialzarRegistroComponent } from '@s-dir-general/mod-inicialzar-registro/mod-inicialzar-registro.component';
import { idPlaneacion, PlaneacionService } from '@s-dir-general/store/planeacion.service';
import { TFilCentroGestorMir } from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';

@Component({
    selector: 'app-mir',
    standalone: true,
    imports: [CommonModule, MatSidenavModule, AccionesMirPbrComponent, ModMirComponent, MatButtonToggleModule, MatIconModule, ListaTabMirComponent],
    providers: [],
    templateUrl: './mir.component.html',
    styleUrls: ['./mir.component.scss']
})
export default class MirComponent implements OnInit
{
    abrirPanel = false;

    constructor(public mdr: MatDialog, private ngxToast: NgxToastService, private planeacionService: PlaneacionService)
    {
    }

    ngOnInit(): void
    {
    }

    regSeleccion(): void
    {
        this.mdr.open(ModMultiplesSeleccionesComponent, { width: '60%' });
    }

    inicializarPlaneacion()
    {
        this.mdr.open(ModInicialzarRegistroComponent, { width: '40%' });
    }

    filCentroGestorMir(e: string): void
    {
        if (!idPlaneacion())
        {
            this.ngxToast.alertaToast('Es necesario que selecciones el año', 'Selecciona un año');
            return;
        }
        const args: TFilCentroGestorMir =
            {
                _id: idPlaneacion(),
                centroGestor: e
            };


        // this.planeacionService.filCentroGestorMir(args).subscribe();
    }

    buscarPorAno(ano: number): void
    {
        // const actMir: TMirsPorAno =
        //     {
        //         ano
        //     };
        // this.mirService.mirsPorAno(actMir).subscribe();
    }

    cerrarPanel(): void
    {
        // this.abrirPanel = false;
    }
}
