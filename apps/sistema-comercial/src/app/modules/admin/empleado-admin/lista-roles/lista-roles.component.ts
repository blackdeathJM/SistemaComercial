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
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'app-lista-roles',
    standalone: true,
    imports:
        [
            CommonModule, MatListModule, MatCheckboxModule, NgxUiLoaderModule, SinDatosComponent, MatTooltipModule, ReactiveFormsModule, FormsModule
        ],
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
        this.sub.add(this.activatedRoute.params.pipe(concatMap(res =>
            this.rolesService.rolesAsig(res._id, this.ngxLoader))).subscribe());
    }

    actCtrl(e: MatCheckboxChange, grupo: string, exp: string, expRuta: string, subRuta: string, empleado: IRoles, ctrls: Element, nivel: number): void
    {
        this.deshabilitarLista = true;
        const ctrl: IActRoles =
            {
                _id: empleado._id,
                idRutaPrincipal: grupo,
                idRutaSecundaria: exp,
                idRutaTreciaria: expRuta,
                idRutaCuarta: subRuta,
                idCtrl: ctrls['id'],
                accesoCtrl: e.checked,
                acceso: true,
                puedeAsigPermisos: false
            };
        switch (nivel)
        {
            case 1:
                this.rolesService.actCtrlPrimerNivel(ctrl).pipe(finalize(() => this.deshabilitarLista = false)).subscribe();
                break;
            case 2:
                this.rolesService.actCtrlSegundoNivel(ctrl).pipe(finalize(() => this.deshabilitarLista = false)).subscribe();
                break;
            case 3:
                this.rolesService.actCtrlTercerNivel(ctrl).pipe(finalize(() => this.deshabilitarLista = false)).subscribe();
                break;
        }
    }

    actRutas(e: MatCheckboxChange, grupo: string, exp: string, expRuta: string, subRuta: string, empleado: IRoles, esAcceso: boolean, nivel: number): void
    {
        this.deshabilitarLista = true;
        const role: IActRoles =
            {
                _id: empleado._id,
                idRutaPrincipal: grupo,
                idRutaSecundaria: exp,
                idRutaTreciaria: expRuta,
                idRutaCuarta: subRuta,
                acceso: false,
                puedeAsigPermisos: false,
                idCtrl: 'no-aplica',
                accesoCtrl: true
            };
        if (esAcceso)
        {
            role.acceso = e.checked;
            role.puedeAsigPermisos = subRuta['puedeAsigPermisos'];
        } else
        {
            role.acceso = subRuta['acceso'];
            role.puedeAsigPermisos = e.checked;
        }

        switch (nivel)
        {
            case 1:
                this.rolesService.actPrimerNivel(role).pipe(finalize(() =>
                {
                    this.deshabilitarLista = false;
                    this.cdr.detectChanges();
                })).subscribe();
                break;
            case 2:
                this.rolesService.actSegundoNivel(role).pipe(finalize(() =>
                {
                    this.deshabilitarLista = false;
                    this.cdr.detectChanges();
                })).subscribe();
                break;
            case 3:
                this.rolesService.actTercerNivel(role).pipe(finalize(() =>
                {
                    this.deshabilitarLista = false;
                    this.cdr.detectChanges();
                })).subscribe();
                break;
        }
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
