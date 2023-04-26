import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { ngxRoles, RolesService } from '@s-core/auth/store/roles.service';
import { concatMap, finalize, Subscription } from 'rxjs';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SinDatosComponent } from '@s-shared/sin-datos/sin-datos.component';
import { IActRoles, IRoles } from '#/libs/models/src/lib/admin/empleado/auth/roles.interface';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavegacionPipe } from '#/apps/sistema-comercial/src/app/pipes/navegacion.pipe';
import { RolesQuery } from '@s-core/auth/store/roles.query';

@Component({
    selector: 'app-lista-roles',
    standalone: true,
    imports:
        [
            CommonModule, MatListModule, MatCheckboxModule, NgxUiLoaderModule, SinDatosComponent, MatTooltipModule, ReactiveFormsModule, FormsModule, NavegacionPipe
        ],
    templateUrl: './lista-roles.component.html',
    styleUrls: ['./lista-roles.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaRolesComponent implements OnInit, OnDestroy
{
    ngxLoader = ngxRoles();
    sub = new Subscription();
    deshabilitarLista = false;

    constructor(private activatedRoute: ActivatedRoute, private rolesService: RolesService, private cdr: ChangeDetectorRef, public rolesQuery: RolesQuery)
    {
    }

    ngOnInit(): void
    {
        this.sub.add(this.activatedRoute.params.pipe(concatMap(res =>
            this.rolesService.rolesAsig(res._id))).subscribe());
    }

    actCtrl(e: MatCheckboxChange, grupo: object, exp: Element, expRuta: Element, subRuta: Element, empleado: IRoles, ctrls: Element, nivel: number): void
    {
        this.deshabilitarLista = true;
        const ctrl: IActRoles =
            {
                _id: empleado._id,
                idRutaPrincipal: grupo !== null ? grupo['id'] : 'no-aplica',
                idRutaSecundaria: exp !== null ? exp['id'] : 'no-aplica',
                idRutaTreciaria: expRuta !== null ? expRuta['id'] : 'no-aplica',
                idRutaCuarta: subRuta !== null ? subRuta['id'] : 'no-aplica',
                idCtrl: ctrls['id'],
                accesoCtrl: e.checked,
                acceso: false,
                puedeAsigPermisos: false
            };
        switch (nivel)
        {
            case 1:
                this.rolesService.actCtrlPrimerNivel(ctrl).pipe(finalize(() =>
                {
                    this.deshabilitarLista = false;
                    this.cdr.detectChanges();
                })).subscribe();
                break;
            case 2:
                this.rolesService.actCtrlSegundoNivel(ctrl).pipe(finalize(() =>
                {
                    this.deshabilitarLista = false;
                    this.cdr.detectChanges();
                })).subscribe();
                break;
            case 3:
                this.rolesService.actCtrlTercerNivel(ctrl).pipe(finalize(() =>
                {
                    this.deshabilitarLista = false;
                    this.cdr.detectChanges();
                })).subscribe();
                break;
        }
    }

    actAsigPermiso(e: MatCheckboxChange, grupo: object, exp: Element, expRuta: Element, subRuta: Element, empleado: IRoles, nivel: number): void
    {
        this.deshabilitarLista = true;
        const asig: IActRoles =
            {
                _id: empleado._id,
                idRutaPrincipal: grupo !== null ? grupo['id'] : 'no-aplica',
                idRutaSecundaria: exp !== null ? exp['id'] : 'no-aplica',
                idRutaTreciaria: expRuta !== null ? expRuta['id'] : 'no-aplica',
                idRutaCuarta: subRuta !== null ? subRuta['id'] : 'no-aplica',
                idCtrl: 'no-aplica',
                accesoCtrl: false,
                acceso: e.checked,
                puedeAsigPermisos: false
            };
        switch (nivel)
        {
            case 1:
                this.rolesService.asiPermisoPrimerNivel(asig).pipe(finalize(() =>
                {
                    this.deshabilitarLista = false;
                    this.cdr.detectChanges();
                })).subscribe();
                break;
            case 2:
                this.rolesService.asiPermisoSegundoNivel(asig).pipe(finalize(() =>
                {
                    this.deshabilitarLista = false;
                    this.cdr.detectChanges();
                })).subscribe();
                break;
            case 3:
                this.rolesService.asiPermisoTercerNivel(asig).pipe(finalize(() =>
                {
                    this.deshabilitarLista = false;
                    this.cdr.detectChanges();
                })).subscribe();
                break;
        }
    }

    actRutas(e: MatCheckboxChange, grupo: object, exp: Element, expRuta: Element, subRuta: Element, empleado: IRoles, nivel: number): void
    {
        this.deshabilitarLista = true;
        const role: IActRoles =
            {
                _id: empleado._id,
                idRutaPrincipal: grupo !== null ? grupo['id'] : 'no-aplica',
                idRutaSecundaria: exp !== null ? exp['id'] : 'no-aplica',
                idRutaTreciaria: expRuta !== null ? expRuta['id'] : 'no-aplica',
                idRutaCuarta: subRuta !== null ? subRuta['id'] : 'no-aplica',
                acceso: e.checked,
                puedeAsigPermisos: false,
                idCtrl: 'no-aplica',
                accesoCtrl: false
            };

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
