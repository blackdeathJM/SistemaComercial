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
import {StateAuth} from '@s-core/auth/store/auth.store';
import {NavegacionPipe} from '#/apps/sistema-comercial/src/app/pipes/navegacion.pipe';

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
    ngxLoader: 'listaRoles';
    sub = new Subscription();
    deshabilitarLista = false;

    constructor(private activatedRoute: ActivatedRoute, private rolesService: RolesService, public stateRoles: StateRoles, private cdr: ChangeDetectorRef, public stateAuth: StateAuth)
    {
    }

    ngOnInit(): void
    {
        this.sub.add(this.activatedRoute.params.pipe(concatMap(res =>
            this.rolesService.rolesAsig(res._id, this.ngxLoader))).subscribe());
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

    actRutas(e: MatCheckboxChange, grupo: object, exp: Element, expRuta: Element, subRuta: Element, empleado: IRoles, esAcceso: boolean, nivel: number): void
    {
        this.deshabilitarLista = true;
        const role: IActRoles =
            {
                _id: empleado._id,
                idRutaPrincipal: grupo !== null ? grupo['id'] : 'no-aplica',
                idRutaSecundaria: exp !== null ? exp['id'] : 'no-aplica',
                idRutaTreciaria: expRuta !== null ? expRuta['id'] : 'no-aplica',
                idRutaCuarta: subRuta !== null ? subRuta['id'] : 'no-aplica',
                acceso: false,
                puedeAsigPermisos: false,
                idCtrl: 'no-aplica',
                accesoCtrl: false
            };

        switch (nivel)
        {
            case 1:
                if (esAcceso)
                {
                    role.acceso = e.checked;
                    role.puedeAsigPermisos = exp['puedeAsigPermisos'];
                } else
                {
                    role.acceso = exp['acceso'];
                    role.puedeAsigPermisos = e.checked;
                }
                console.log('++++', role);
                this.rolesService.actPrimerNivel(role).pipe(finalize(() =>
                {
                    this.deshabilitarLista = false;
                    this.cdr.detectChanges();
                })).subscribe();
                break;
            case 2:
                if (esAcceso)
                {
                    role.acceso = e.checked;
                    role.puedeAsigPermisos = expRuta['puedeAsigPermisos'];
                } else
                {
                    role.acceso = expRuta['acceso'];
                    role.puedeAsigPermisos = e.checked;
                }
                this.rolesService.actSegundoNivel(role).pipe(finalize(() =>
                {
                    this.deshabilitarLista = false;
                    this.cdr.detectChanges();
                })).subscribe();
                break;
            case 3:
                if (esAcceso)
                {
                    role.acceso = e.checked;
                    role.puedeAsigPermisos = subRuta['puedeAsigPermisos'];
                } else
                {
                    role.acceso = subRuta['acceso'];
                    role.puedeAsigPermisos = e.checked;
                }

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
