import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {RolesService} from '@s-core/auth/store/roles.service';
import {StateRoles} from '@s-core/auth/store/roles.store';
import {concatMap, Subscription} from 'rxjs';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {SinDatosComponent} from '@s-shared/sin-datos/sin-datos.component';

@Component({
    selector: 'app-lista-roles',
    standalone: true,
    imports: [CommonModule, MatListModule, MatCheckboxModule, NgxUiLoaderModule, SinDatosComponent],
    templateUrl: './lista-roles.component.html',
    styleUrls: ['./lista-roles.component.scss']
})
export class ListaRolesComponent implements OnInit, OnDestroy
{
    ngxLoader: 'listaRoles';
    sub = new Subscription();

    constructor(private activatedRoute: ActivatedRoute, private rolesService: RolesService, public stateRoles: StateRoles)
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

    cambioChk(e: MatCheckboxChange, ruta: Element, grupo: object): void
    {
        console.log('::::::::::', grupo);
    }
}
