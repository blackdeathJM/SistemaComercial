import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';

@Component({
    selector: 'app-mod-doc-ref',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatChipsModule],
    templateUrl: './mod-doc-ref.component.html',
    styleUrls: ['./mod-doc-ref.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModDocRefComponent implements OnInit
{

    constructor()
    {
    }

    ngOnInit(): void
    {
    }

}
