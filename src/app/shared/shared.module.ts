import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrosComponent} from './registros/registros.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    imports:
        [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            MatExpansionModule,
            MatButtonModule,
            MatIconModule,
            MatProgressSpinnerModule
        ],
    exports:
        [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RegistrosComponent
        ],
    declarations:
        [
            RegistrosComponent
        ]
})
export class SharedModule
{
}
