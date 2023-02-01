import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RolesService} from '@s-core/auth/store/roles.service';
import {StateRoles} from '@s-core/auth/store/roles.store';
import {Observable} from 'rxjs';
import {IRoles} from '#/libs/models/src/lib/admin/empleado/auth/roles.interface';
import {Select} from '@ngxs/store';

@Component({
    selector: 'app-lista-roles',
    standalone: true,
    imports: [CommonModule, MatListModule, MatCheckboxModule],
    templateUrl: './lista-roles.component.html',
    styleUrls: ['./lista-roles.component.scss']
})
export class ListaRolesComponent implements OnInit
{
    // @Select(StateRoles.roles) roles$: Observable<IRoles>;

    constructor(private activatedRoute: ActivatedRoute, private rolesService: RolesService, public stateRoles: StateRoles)
    {
    }

    ngOnInit(): void
    {
        // this.id = this.activatedRoute.snapshot.paramMap.get('_id');
        // this.activatedRoute.paramMap.subscribe(res => console.log(res));
        // this.activatedRoute.params.pipe(concatMap(res =>
        // this.rolesService.rolesAsig(res._id))).subscribe();
    }
}
