import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlaneacionService} from '@s-dir-general/store/planeacion.service';
import {makeVar} from '@apollo/client';
import {isNotNil} from '@angular-ru/cdk/utils';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';

export const SELEC_CENTRO_GESTOR = makeVar<string>(null);

@Component({
    selector: 'app-list-drop-centro-gestor',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatListModule],
    templateUrl: './list-drop-centro-gestor.component.html',
    styleUrls: ['./list-drop-centro-gestor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDropCentroGestorComponent implements OnInit
{
    esLista = false;
    centrosGestores: string[] = [];

    constructor(private planeacionService: PlaneacionService)
    {
    }

    ngOnInit(): void
    {
        this.planeacionService.centrosGestores().subscribe((res) =>
        {
            if (isNotNil(res.data) && res.data.centrosGestores.length > 0)
            {
                this.centrosGestores = res.data.centrosGestores;
            }
        });
    }
}
