import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {RolesService} from '@s-core/auth/store/roles.service';
import {StateRoles} from '@s-core/auth/store/roles.store';
import {concatMap, finalize, Subscription} from 'rxjs';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {SinDatosComponent} from '@s-shared/sin-datos/sin-datos.component';
import {IActRoles, IRoles} from '#/libs/models/src/lib/admin/empleado/auth/roles.interface';
import {MatTooltipModule} from "@angular/material/tooltip";

@Component({
    selector: 'app-lista-roles',
    standalone: true,
    imports: [CommonModule, MatListModule, MatCheckboxModule, NgxUiLoaderModule, SinDatosComponent, MatTooltipModule],
    templateUrl: './lista-roles.component.html',
    styleUrls: ['./lista-roles.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaRolesComponent implements OnInit, OnDestroy
{
    ngxLoader: 'listaRoles';
    sub = new Subscription();
    deshabilitarLista = false;

    constructor(private activatedRoute: ActivatedRoute, private rolesService: RolesService, public stateRoles: StateRoles, private cdr: ChangeDetectorRef)
    {
    }

    ngOnInit(): void
    {
        // this.id = this.activatedRoute.snapshot.paramMap.get('_id');
        // this.activatedRoute.paramMap.subscribe(res => console.log(res));

        this.sub.add(this.activatedRoute.params.pipe(concatMap(res =>
            this.rolesService.rolesAsig(res._id, this.ngxLoader))).subscribe());
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }

    cambioPrimerNivel(e: MatCheckboxChange, grupo: object, expandible: Element, empleado: IRoles): void
    {
        this.deshabilitarLista = true;
        const role: IActRoles =
            {
                _id: empleado._id,
                idRutaPrincipal: grupo['id'],
                idRutaSecundaria: expandible['id'],
                idRutaTreciaria: 'no-aplica',
                idRutaCuarta: 'no-aplica',
                acceso: e.checked
            };
        this.rolesService.actPrimerNivel(role).pipe(finalize(() =>
        {
            this.deshabilitarLista = false;
            this.cdr.detectChanges();
        })).subscribe();
    }

    cambioSegNivel(e: MatCheckboxChange, grupo: object, expandible: Element, ruta: Element, empleado: IRoles): void
    {
        this.deshabilitarLista = true;
        const role: IActRoles =
            {
                _id: empleado._id,
                idRutaPrincipal: grupo['id'],
                idRutaSecundaria: expandible['id'],
                idRutaTreciaria: ruta['id'],
                idRutaCuarta: 'no-aplica',
                acceso: e.checked
            };
        this.rolesService.actSegundoNivel(role).pipe(finalize(() =>
        {
            this.deshabilitarLista = false;
            this.cdr.detectChanges();
        })).subscribe();
    }

    cambioTercerNivel(e: MatCheckboxChange, grupo: object, expandible: Element, ruta: Element, subRuta: Element, empleado: IRoles): void
    {
        this.deshabilitarLista = true;
        const role: IActRoles =
            {
                _id: empleado._id,
                idRutaPrincipal: grupo['id'],
                idRutaSecundaria: expandible['id'],
                idRutaTreciaria: ruta['id'],
                idRutaCuarta: subRuta['id'],
                acceso: e.checked
            };
        this.rolesService.actTercerNivel(role).pipe(finalize(() =>
        {
            this.deshabilitarLista = false;
            this.cdr.detectChanges();
        })).subscribe();
    }
}
